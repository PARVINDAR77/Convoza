import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/inbox',
})
export class InboxGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(InboxGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async handleConnection(client: Socket) {
    try {
      const authHeader = client.handshake.headers.authorization || client.handshake.auth?.token;
      if (!authHeader) {
        client.disconnect();
        return;
      }

      const token = authHeader.replace(/^Bearer\s+/i, '');
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'super-secret-convoza-jwt-access-token-key-2026',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          memberships: {
            where: { isActive: true },
          },
        },
      });

      if (!user || !user.isActive) {
        client.disconnect();
        return;
      }

      // Attach user info to socket
      (client as any).user = user;

      // Join tenant-scoped rooms for all organizations this user belongs to
      for (const m of user.memberships) {
        const roomName = `org_${m.organizationId}`;
        client.join(roomName);
      }

      this.logger.log(`WebSocket client connected: user=${user.email}, socket=${client.id}`);
    } catch (err: any) {
      this.logger.warn(`WebSocket connection rejected: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`WebSocket client disconnected: socket=${client.id}`);
  }

  /**
   * Broadcast new message to tenant room
   */
  broadcastNewMessage(organizationId: string, message: any) {
    this.server.to(`org_${organizationId}`).emit('message:new', message);
  }

  /**
   * Broadcast message status event (e.g. sent, delivered, read, failed)
   */
  broadcastMessageStatus(organizationId: string, statusEvent: any) {
    this.server.to(`org_${organizationId}`).emit('message:status', statusEvent);
  }

  /**
   * Broadcast conversation updates (assignment, resolution)
   */
  broadcastConversationUpdate(organizationId: string, conversation: any) {
    this.server.to(`org_${organizationId}`).emit('conversation:update', conversation);
  }
}


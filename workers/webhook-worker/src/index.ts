import { PrismaClient } from '@prisma/client';
import { WORKER_CONFIG } from '@convoza/configuration';

const prisma = new PrismaClient();
let isRunning = true;

async function processWebhookJob(job: any) {
  const payload = job.payload as any;
  const eventType = payload.eventType; // 'DELIVERY_STATUS', 'INCOMING_MESSAGE', 'TEMPLATE_STATUS'

  if (eventType === 'DELIVERY_STATUS' && payload.wamid) {
    const status = payload.status; // 'DELIVERED', 'READ', 'FAILED'
    const message = await prisma.message.findUnique({
      where: { wamid: payload.wamid },
    });

    if (message) {
      await prisma.message.update({
        where: { id: message.id },
        data: {
          status,
          ...(status === 'DELIVERED' && { deliveredAt: new Date() }),
          ...(status === 'READ' && { readAt: new Date() }),
        },
      });

      await prisma.messageStatusEvent.create({
        data: {
          messageId: message.id,
          status,
          timestamp: new Date(),
          rawPayload: payload,
        },
      });
    }
  }
}

async function runWebhookWorker() {
  console.log('CONVOZA Webhook Worker started (asynchronous ingestion worker)...');

  while (isRunning) {
    try {
      const jobs: any[] = await prisma.$transaction(async (tx) => {
        const rows: any[] = await tx.$queryRaw`
          SELECT id, "organizationId", type, payload, attempts, "maxAttempts"
          FROM outbox_events
          WHERE status = 'PENDING'
            AND type = 'PROCESS_WEBHOOK_EVENT'
            AND "scheduledFor" <= NOW()
          ORDER BY "scheduledFor" ASC
          LIMIT 20
          FOR UPDATE SKIP LOCKED
        `;

        if (rows.length === 0) return [];

        const ids = rows.map((r) => r.id);
        await tx.$executeRaw`
          UPDATE outbox_events
          SET status = 'PROCESSING', "lockedAt" = NOW()
          WHERE id = ANY(${ids}::text[])
        `;

        return rows;
      });

      if (jobs.length > 0) {
        for (const job of jobs) {
          try {
            await processWebhookJob(job);
            await prisma.outboxEvent.update({
              where: { id: job.id },
              data: { status: 'COMPLETED' },
            });
          } catch (err: any) {
            await prisma.outboxEvent.update({
              where: { id: job.id },
              data: {
                attempts: job.attempts + 1,
                lastError: err.message,
                status: job.attempts >= 5 ? 'DEAD_LETTER' : 'PENDING',
              },
            });
          }
        }
      } else {
        await new Promise((res) => setTimeout(res, WORKER_CONFIG.POLL_INTERVAL_MS));
      }
    } catch (err) {
      console.error('Webhook worker error:', err);
      await new Promise((res) => setTimeout(res, 2000));
    }
  }

  await prisma.$disconnect();
  console.log('Webhook Worker stopped gracefully.');
}

process.on('SIGTERM', () => { isRunning = false; });
process.on('SIGINT', () => { isRunning = false; });

runWebhookWorker();

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AutomationsService } from './automations.service';
import { CreateAutomationDto, UpdateAutomationDto } from './dto/automation.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentOrg } from '../../common/decorators';

@ApiTags('Automations & Rule Engine')
@Controller('automations')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all automation rules with execution counts' })
  async getAutomations(@CurrentOrg() org: any) {
    return this.automationsService.getAutomations(org.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new rule-based automation' })
  async createAutomation(@CurrentOrg() org: any, @Body() dto: CreateAutomationDto) {
    return this.automationsService.createAutomation(org.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get automation rule and recent execution history' })
  async getAutomation(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.automationsService.getAutomationById(org.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update automation triggers, conditions, or actions' })
  async updateAutomation(
    @CurrentOrg() org: any,
    @Param('id') id: string,
    @Body() dto: UpdateAutomationDto
  ) {
    return this.automationsService.updateAutomation(org.id, id, dto);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate an automation rule' })
  async activate(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.automationsService.toggleActive(org.id, id, true);
  }

  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate an automation rule' })
  async deactivate(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.automationsService.toggleActive(org.id, id, false);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an automation rule' })
  async delete(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.automationsService.deleteAutomation(org.id, id);
  }
}

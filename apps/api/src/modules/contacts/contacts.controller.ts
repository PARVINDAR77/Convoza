import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto, CsvImportDto } from './dto/contact.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentOrg } from '../../common/decorators';

@ApiTags('Contacts & Audience Management')
@Controller('contacts')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'List contacts with filters and pagination' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'tagId', required: false })
  @ApiQuery({ name: 'listId', required: false })
  @ApiQuery({ name: 'consentStatus', required: false })
  async getContacts(
    @CurrentOrg() org: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('tagId') tagId?: string,
    @Query('listId') listId?: string,
    @Query('consentStatus') consentStatus?: string
  ) {
    return this.contactsService.getContacts(org.id, {
      page,
      limit,
      search,
      tagId,
      listId,
      consentStatus,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contact with E.164 normalization and consent record' })
  async createContact(@CurrentOrg() org: any, @Body() dto: CreateContactDto) {
    return this.contactsService.createContact(org.id, dto);
  }

  @Post('import')
  @ApiOperation({ summary: 'Bulk import contacts with duplicate handling and error reporting' })
  async importContacts(@CurrentOrg() org: any, @Body() dto: CsvImportDto) {
    return this.contactsService.importContacts(org.id, dto);
  }

  @Get('export')
  @ApiOperation({ summary: 'Export contacts to CSV file' })
  async exportContacts(@CurrentOrg() org: any) {
    return this.contactsService.exportContacts(org.id);
  }

  @Get('tags')
  @ApiOperation({ summary: 'List contact tags' })
  async getTags(@CurrentOrg() org: any) {
    return this.contactsService.getTags(org.id);
  }

  @Get('lists')
  @ApiOperation({ summary: 'List contact lists' })
  async getLists(@CurrentOrg() org: any) {
    return this.contactsService.getLists(org.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific contact' })
  async getContact(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.contactsService.getContactById(org.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update contact details or consent' })
  async updateContact(
    @CurrentOrg() org: any,
    @Param('id') id: string,
    @Body() dto: UpdateContactDto
  ) {
    return this.contactsService.updateContact(org.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact' })
  async deleteContact(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.contactsService.deleteContact(org.id, id);
  }
}


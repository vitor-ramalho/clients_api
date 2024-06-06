import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './schema/client.schema';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() clientData: CreateClientDto) {
    return this.clientsService.create(clientData);
  }

  @Put(':cpf')
  async update(@Param('cpf') cpf: string, @Body() clientData: UpdateClientDto) {
    const client: Client = { ...clientData, cpf };
    return this.clientsService.update(cpf, client);
  }

  @Get(':cpf')
  async search(@Param('cpf') cpf: string): Promise<Client> {
    return this.clientsService.search(cpf);
  }
}

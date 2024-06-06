import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schema/client.schema';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  async create(client: Client): Promise<Client> {
    const createdClient = new this.clientModel(client);
    try {
      return await createdClient.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async update(cpf: string, client: Client): Promise<Client> {
    const updatedClient = await this.clientModel.findOneAndUpdate(
      { cpf },
      client,
      { new: true },
    );
    if (!updatedClient) {
      throw new NotFoundException('Client not found');
    }
    return updatedClient;
  }

  async search(cpf: string): Promise<Client> {
    const client = await this.clientModel.findOne({ cpf }).exec();
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}

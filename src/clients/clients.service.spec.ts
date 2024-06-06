import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { Client } from './schema/client.schema';
import { NotFoundException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let clientModel;

  beforeEach(async () => {
    const save = jest.fn();
    clientModel = jest.fn().mockImplementation((clientData) => {
      return { ...clientData, save };
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getModelToken('Client'),
          useValue: clientModel,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const client: Client = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        number: '123',
        street: '123 Main St',
        city: 'Anytown',
        zip_code: '12345',
        district: 'Downtown',
      },
      phoneNumbers: ['1234567890'],
      maritalStatus: 'Single',
    };
    const mockClientInstance = new clientModel(client);
    mockClientInstance.save.mockResolvedValue(client);
    expect(await service.create(client)).toEqual(client);
  });

  it('findAll should return an array of clients', async () => {
    const result: Client[] = [
      {
        cpf: '12345678901',
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: {
          number: '123',
          street: '123 Main St',
          city: 'Anytown',
          zip_code: '12345',
          district: 'Downtown',
        },
        phoneNumbers: ['1234567890'],
        maritalStatus: 'Single',
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await service.findAll()).toBe(result);
  });

  it('update should return an updated client', async () => {
    const result: Client = {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        number: '123',
        street: '123 Main St',
        city: 'Anytown',
        zip_code: '12345',
        district: 'Downtown',
      },
      phoneNumbers: ['1234567890'],
      maritalStatus: 'Single',
    };
    const cpf = '12345678900';
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    expect(await service.update(cpf, result)).toBe(result);
  });

  it('search should return a client', async () => {
    const result: Client = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        number: '123',
        street: '123 Main St',
        city: 'Anytown',
        zip_code: '12345',
        district: 'Downtown',
      },
      phoneNumbers: ['1234567890'],
      maritalStatus: 'Single',
    };
    const cpf = '12345678900';
    jest.spyOn(service, 'search').mockImplementation(async () => result);

    expect(await service.search(cpf)).toBe(result);
  });
});

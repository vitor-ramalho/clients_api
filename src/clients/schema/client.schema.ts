import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Document & Client;

class Address {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zip_code: string;

  @Prop({ required: true })
  district: string;
}

@Schema()
export class Client {
  @Prop({ unique: true, required: true })
  cpf: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  maritalStatus: string;

  @Prop({ required: true })
  address: Address;

  @Prop({ type: [String], required: true })
  phoneNumbers: string[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);

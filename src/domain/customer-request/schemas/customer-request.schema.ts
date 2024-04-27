import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerRequestDocument = HydratedDocument<CustomerRequest>;

@Schema()
export class CustomerRequest {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  comments: string;

  @Prop()
  branchOffice: string;
}

export const CustomerRequestSchema =
  SchemaFactory.createForClass(CustomerRequest);

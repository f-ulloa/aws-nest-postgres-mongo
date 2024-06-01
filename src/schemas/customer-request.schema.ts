import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { BranchOffice } from './branch-office.schema';

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

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'BranchOffice',
  })
  branchOffice: BranchOffice;
}

export const CustomerRequestSchema =
  SchemaFactory.createForClass(CustomerRequest);

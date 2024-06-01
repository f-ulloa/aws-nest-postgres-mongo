import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { CustomerRequest } from './customer-request.schema';

export type BranchOfficeDocument = HydratedDocument<BranchOffice>;

@Schema()
export class BranchOffice {
  @Prop()
  name: string;

  @Prop()
  location: string;

  @Prop()
  contactNumber: string;

  @Prop()
  managerName: string;

  @Prop({ type: MongooseSchema.Types.Array, ref: 'CustomerRequest' })
  customerRequests: Types.ObjectId[];
}

export const BranchOfficeSchema = SchemaFactory.createForClass(BranchOffice);

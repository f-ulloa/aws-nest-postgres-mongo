import { Module } from '@nestjs/common';
import { CustomerRequestService } from './customer-request.service';
import { CustomerRequestController } from './customer-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerRequest,
  CustomerRequestSchema,
} from '../../schemas/customer-request.schema';
import {
  BranchOffice,
  BranchOfficeSchema,
} from 'src/schemas/branch-office.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerRequest.name, schema: CustomerRequestSchema },
      { name: BranchOffice.name, schema: BranchOfficeSchema },
    ]),
  ],
  controllers: [CustomerRequestController],
  providers: [CustomerRequestService],
})
export class CustomerRequestModule {}

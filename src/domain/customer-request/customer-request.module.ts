import { Module } from '@nestjs/common';
import { CustomerRequestService } from './customer-request.service';
import { CustomerRequestController } from './customer-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerRequest,
  CustomerRequestSchema,
} from '../../schemas/customer-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerRequest.name, schema: CustomerRequestSchema },
    ]),
  ],
  controllers: [CustomerRequestController],
  providers: [CustomerRequestService],
})
export class CustomerRequestModule {}

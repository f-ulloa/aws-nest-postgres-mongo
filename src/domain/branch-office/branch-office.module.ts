import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BranchOffice,
  BranchOfficeSchema,
} from 'src/schemas/branch-office.schema';
import { BranchOfficeController } from './branch-office.controller';
import { BranchOfficeService } from './branch-office.services';
import {
  CustomerRequest,
  CustomerRequestSchema,
} from 'src/schemas/customer-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BranchOffice.name, schema: BranchOfficeSchema },
      { name: CustomerRequest.name, schema: CustomerRequestSchema },
    ]),
  ],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService],
})
export class BranchOfficeModule {}

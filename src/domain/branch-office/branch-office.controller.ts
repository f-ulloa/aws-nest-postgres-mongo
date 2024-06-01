import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BranchOfficeService } from './branch-office.services';
import { CreateBranchOffice } from './dto/create-branch-office.dto';
import { UpdateBranchOffice } from './dto/update-branch-office.dto';

@Controller('branch-office')
export class BranchOfficeController {
  constructor(private readonly branchOfficeService: BranchOfficeService) {}

  @Post()
  create(@Body() createBranchOfficeDto: CreateBranchOffice) {
    return this.branchOfficeService.create(createBranchOfficeDto);
  }

  @Get()
  findAll() {
    return this.branchOfficeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchOfficeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBranchOfficeDto: UpdateBranchOffice,
  ) {
    return this.branchOfficeService.update(id, updateBranchOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchOfficeService.remove(id);
  }

  @Post(':branchOfficeId/customer-request/:customerRequestId')
  addCustomerRequest(
    @Param('branchOfficeId') branchOfficeId: string,
    @Param('customerRequestId') customerRequestId: string,
  ) {
    return this.branchOfficeService.addCustomerRequest(
      branchOfficeId,
      customerRequestId,
    );
  }

  @Delete(':branchOfficeId/customer-request/:customerRequestId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCustomerRequest(
    @Param('branchOfficeId') branchOfficeId: string,
    @Param('customerRequestId') customerRequestId: string,
  ) {
    return this.branchOfficeService.removeCustomerRequest(
      branchOfficeId,
      customerRequestId,
    );
  }
}

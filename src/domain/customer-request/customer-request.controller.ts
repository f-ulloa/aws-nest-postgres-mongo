import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerRequestService } from './customer-request.service';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { UpdateCustomerRequestDto } from './dto/update-customer-request.dto';

@Controller('customer-request')
export class CustomerRequestController {
  constructor(
    private readonly customerRequestService: CustomerRequestService,
  ) {}

  @Post()
  create(@Body() createCustomerRequestDto: CreateCustomerRequestDto) {
    return this.customerRequestService.create(createCustomerRequestDto);
  }

  @Get()
  findAll() {
    return this.customerRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerRequestService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerRequestDto: UpdateCustomerRequestDto,
  ) {
    return this.customerRequestService.update(+id, updateCustomerRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerRequestService.remove(+id);
  }
}

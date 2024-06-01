import { Injectable } from '@nestjs/common';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { UpdateCustomerRequestDto } from './dto/update-customer-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerRequest } from '../../schemas/customer-request.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerRequestService {
  constructor(
    @InjectModel(CustomerRequest.name)
    private readonly customerRequestModel: Model<CustomerRequest>,
  ) {}

  create(createCustomerRequestDto: CreateCustomerRequestDto) {
    const customerRequest = new this.customerRequestModel(
      createCustomerRequestDto,
    );
    return customerRequest.save();
  }

  findAll() {
    return this.customerRequestModel.find();
  }

  findOne(id: string) {
    return this.customerRequestModel.findById(id);
  }

  update(id: number, updateCustomerRequestDto: UpdateCustomerRequestDto) {
    return this.customerRequestModel.updateOne(
      { id },
      updateCustomerRequestDto,
    );
  }

  remove(id: number) {
    return this.customerRequestModel.findByIdAndDelete(id);
  }
}

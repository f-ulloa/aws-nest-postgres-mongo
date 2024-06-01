import { Injectable } from '@nestjs/common';
import { CreateCustomerRequestDto } from './dto/create-customer-request.dto';
import { UpdateCustomerRequestDto } from './dto/update-customer-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerRequest } from '../../schemas/customer-request.schema';
import { ClientSession, Model, Types } from 'mongoose';
import { BranchOffice } from 'src/schemas/branch-office.schema';

@Injectable()
export class CustomerRequestService {
  constructor(
    @InjectModel(CustomerRequest.name)
    private readonly customerRequestModel: Model<CustomerRequest>,
    @InjectModel(BranchOffice.name)
    private readonly branchOfficeModel: Model<BranchOffice>,
  ) {}

  async create(createCustomerRequestDto: CreateCustomerRequestDto) {
    const customerRequest = new this.customerRequestModel(
      createCustomerRequestDto,
    );
    const savedCustomerRequest = await customerRequest.save();

    await this.branchOfficeModel.findByIdAndUpdate(
      savedCustomerRequest.branchOffice,
      { $push: { customerRequests: savedCustomerRequest._id } },
    );

    return savedCustomerRequest;
  }

  findAll() {
    return this.customerRequestModel.find().populate('branchOffice').exec();
  }

  findOne(id: string) {
    return this.customerRequestModel
      .findById(id)
      .populate('branchOffice')
      .exec();
  }

  async update(id: string, updateCustomerRequestDto: UpdateCustomerRequestDto) {
    const session = await this.customerRequestModel.startSession();
    session.startTransaction();

    try {
      const actualCustomerRequest = await this.getCustomerRequestById(
        id,
        session,
      );
      const updatedCustomerRequest = await this.updateCustomerRequest(
        id,
        updateCustomerRequestDto,
        session,
      );

      if (
        this.shouldUpdateBranchOffice(
          updateCustomerRequestDto,
          actualCustomerRequest,
        )
      ) {
        await this.updateBranchOfficesReferences(
          actualCustomerRequest,
          updatedCustomerRequest,
          updateCustomerRequestDto,
          session,
        );
      }

      await session.commitTransaction();
      return updatedCustomerRequest;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  remove(id: number) {
    return this.customerRequestModel.findByIdAndDelete(id);
  }

  private async getCustomerRequestById(id: string, session: ClientSession) {
    const customerRequest = await this.customerRequestModel
      .findById(id)
      .session(session);
    if (!customerRequest) throw new Error('CustomerRequest not found');
    return customerRequest;
  }

  private async updateCustomerRequest(
    id: string,
    updateDto: UpdateCustomerRequestDto,
    session: ClientSession,
  ) {
    return this.customerRequestModel.findByIdAndUpdate(id, updateDto, {
      new: true,
      session,
    });
  }

  private shouldUpdateBranchOffice(
    updateDto: UpdateCustomerRequestDto,
    actualCustomerRequest: CustomerRequest,
  ) {
    return (
      updateDto.branchOffice &&
      updateDto.branchOffice !== actualCustomerRequest.branchOffice.toString()
    );
  }

  private async updateBranchOfficesReferences(
    actualCustomerRequest: CustomerRequest & {
      _id: Types.ObjectId;
    },
    updatedCustomerRequest: CustomerRequest & {
      _id: Types.ObjectId;
    },
    updateDto: UpdateCustomerRequestDto,
    session: ClientSession,
  ) {
    if (actualCustomerRequest.branchOffice) {
      await this.branchOfficeModel.findByIdAndUpdate(
        actualCustomerRequest.branchOffice,
        { $pull: { customerRequests: actualCustomerRequest._id } },
        { session },
      );
    }

    await this.branchOfficeModel.findByIdAndUpdate(
      updateDto.branchOffice,
      { $push: { customerRequests: updatedCustomerRequest._id } },
      { session },
    );
  }
}

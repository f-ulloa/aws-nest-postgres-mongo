import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BranchOffice,
  BranchOfficeDocument,
} from 'src/schemas/branch-office.schema';
import {
  CustomerRequest,
  CustomerRequestDocument,
} from 'src/schemas/customer-request.schema';
import { CreateBranchOffice } from './dto/create-branch-office.dto';
import { UpdateBranchOffice } from './dto/update-branch-office.dto';
import { Model } from 'mongoose';

@Injectable()
export class BranchOfficeService {
  constructor(
    @InjectModel(BranchOffice.name)
    private readonly branchOfficeModel: Model<BranchOfficeDocument>,
    @InjectModel(CustomerRequest.name)
    private readonly customerRequestModel: Model<CustomerRequestDocument>,
  ) {}

  async create(createBranchOfficeDto: CreateBranchOffice) {
    const newBranchOffice = new this.branchOfficeModel(createBranchOfficeDto);
    return newBranchOffice.save();
  }

  async findAll() {
    return this.branchOfficeModel.find().populate('customerRequests').exec();
  }

  async findOne(id: string) {
    return this.branchOfficeModel
      .findById(id)
      .populate('customerRequests')
      .exec();
  }

  async update(id: string, updateBranchOfficeDto: UpdateBranchOffice) {
    return this.branchOfficeModel
      .findByIdAndUpdate(id, updateBranchOfficeDto, {
        new: true,
      })
      .populate('customerRequests')
      .exec();
  }

  async remove(id: string) {
    return this.branchOfficeModel.findByIdAndDelete(id);
  }

  async addCustomerRequest(branchOfficeId: string, customerRequestId: string) {
    const session = await this.branchOfficeModel.startSession();
    session.startTransaction();

    try {
      const branchOffice = await this.branchOfficeModel
        .findById(branchOfficeId)
        .session(session);
      if (!branchOffice) throw new Error('BranchOffice not found');

      const customerRequest = await this.customerRequestModel
        .findById(customerRequestId)
        .session(session);
      if (!customerRequest) throw new Error('CustomerRequest not found');

      await this.customerRequestModel.findByIdAndUpdate(
        customerRequestId,
        { branchOffice: branchOfficeId },
        { session },
      );

      const updatedBranchOffice =
        await this.branchOfficeModel.findByIdAndUpdate(
          branchOfficeId,
          { $push: { customerRequests: customerRequestId } },
          { new: true, session },
        );
      console.log({ updatedBranchOffice });

      await session.commitTransaction();
      return updatedBranchOffice;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async removeCustomerRequest(
    branchOfficeId: string,
    customerRequestId: string,
  ) {
    const session = await this.branchOfficeModel.startSession();
    session.startTransaction();

    try {
      const branchOffice = await this.branchOfficeModel
        .findById(branchOfficeId)
        .session(session);
      if (!branchOffice) throw new Error('BranchOffice not found');

      const customerRequest = await this.customerRequestModel
        .findById(customerRequestId)
        .session(session);
      if (!customerRequest) throw new Error('CustomerRequest not found');

      await this.customerRequestModel.findByIdAndUpdate(
        customerRequestId,
        { branchOffice: null },
        { session },
      );

      await this.branchOfficeModel.findByIdAndUpdate(
        branchOfficeId,
        { $pull: { customerRequests: customerRequestId } },
        { session },
      );

      await session.commitTransaction();
      return branchOffice;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

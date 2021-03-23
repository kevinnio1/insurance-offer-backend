import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interfaces/userInterface';
import * as mongoose from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: mongoose.Model<
      UserInterface & mongoose.Document
    >,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersModel.findOne({ email });
  }
}

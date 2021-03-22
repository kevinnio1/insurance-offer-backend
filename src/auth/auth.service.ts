import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './models/login.dto';
import * as jsonwebtoken from "jsonwebtoken";
import { EnvConfig } from 'src/common/config/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginFormValues: LoginDTO): Promise<any> {
    const user = await this.usersService.findOne(loginFormValues.email);
    if (user && user.password === loginFormValues.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    //loginformvalues
    const payload = { email: user.email };
    const obj = {
        aud: "INSURANCE",
        email: user.email,
        iss: Math.round(new Date().getTime() / 1000),
        role: "CLIENT",
        exp: Math.round(new Date().getTime() / 1000 + 604800)
    };

    return jsonwebtoken.sign(obj, EnvConfig.JWT_SECRET);   
  }
}
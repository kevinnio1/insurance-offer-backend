import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { createHash} from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginFormValues: LoginDTO): Promise<any> {
    const user = await this.usersService.findOne(loginFormValues.email);
    
    if (user && user.password === createHash("sha256").update(loginFormValues.password).digest("hex")) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
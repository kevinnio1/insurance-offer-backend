import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PriceModule } from './price/price.module';
import { UsersModule } from './users/users.module';
import jwt = require("express-jwt");

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PriceModule
  ],
})
export class AppModule {}

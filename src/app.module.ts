import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PriceModule } from './price/price.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from './common/config/env';
import { AppController } from './app.controller';
import { ServiceExceptionFilter } from './common/serviceExceptionFilter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PriceModule,
    MongooseModule.forRoot(EnvConfig.MONGO_DB_URI, {
			dbName: EnvConfig.MONGO_DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
  ],
  controllers: [
    AppController
  ],
  providers: [{
		provide: APP_FILTER,
		useClass: ServiceExceptionFilter
	}]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from './schemas/userSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
			{
				name: "User",
				schema: UserSchema,
				collection: "Users"
			}
    ])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: []
})
export class UsersModule {}
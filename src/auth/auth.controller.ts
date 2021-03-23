import { Body, Controller,Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './models/login.dto';

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    /**
     * Creates an instance of authController.
     *
     */
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {
    }
    /**
     * This will login the user by email and password.
     */
    @Post("/login")
    @ApiOperation({ description: "Login with email and password" })
    @ApiResponse({
        status: 200,
        type: String
    })
    async login(@Body() loginFormValues: LoginDTO) {
        
        const validatedUser = await this.authService.validateUser(loginFormValues);

        if (!validatedUser) {
           throw new UnauthorizedException();
        }

        return this.authService.login(validatedUser);;
    }

}

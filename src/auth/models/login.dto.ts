import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty()
    public readonly email: string;
    @ApiProperty()
    public readonly password: string;
}
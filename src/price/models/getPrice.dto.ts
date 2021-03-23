import { ApiProperty } from "@nestjs/swagger";

export class GetPriceDTO {
    @ApiProperty()
    public readonly age: string;
    @ApiProperty()
    public readonly car: string;
    @ApiProperty()
    public readonly price: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class PriceRequestAnswer {
    @ApiProperty()
    globalPrice: number;
    @ApiProperty()
    universalPrice: number;
}
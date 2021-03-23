import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetPriceDTO } from './models/getPrice.dto';
import { PriceService } from './price.service';

@ApiTags("price")
@Controller("price")
export class PriceController {
    /**
     * Creates an instance of priceController.
     *
     */
    constructor(private readonly priceService: PriceService) {
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ description: "Get a price based on age, car and purchase price" })
    @ApiResponse({
        status: 200,
        type: String
    })
    async getPrice(@Body() getPriceDTO: GetPriceDTO) {

        return this.priceService.getPrice(getPriceDTO);
    }

}

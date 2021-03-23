import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
    /**
     * Creates an instance of appController.
     *
     */

    @Get("alive")
    @ApiOperation({ description: "Get alive status" })
    @ApiResponse({
        status: 200,
        type: String
    })
    async getAlive() {

        return "I'm alive!";
    }

}

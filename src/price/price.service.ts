import { Injectable } from '@nestjs/common';
import { GetPriceDTO } from './models/getPrice.dto';

@Injectable()
export class PriceService {

  async getPrice(getPriceDTO: GetPriceDTO): Promise<any> {

    console.log({getPriceDTO});
    return null;
  }

}
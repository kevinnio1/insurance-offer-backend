import { Injectable } from '@nestjs/common';
import { ServiceErrors } from '../common/exceptions/errors';
import { ServiceException } from '../common/exceptions/service.exception';
import { GetPriceDTO } from './models/getPrice.dto';
import { PriceRequestAnswer } from './models/priceRequestAnswer';

@Injectable()
export class PriceService {
  async getPrice(getPriceDTO: GetPriceDTO): Promise<PriceRequestAnswer> {
   
    if (this.isPriceRequestValid(getPriceDTO)) {
      return this.calculatePrices(getPriceDTO);
    }

    return null;
  }

  calculatePrices(getPriceDTO: GetPriceDTO) {
    let priceCar = parseInt(getPriceDTO.price);

    const calculatedPrices: PriceRequestAnswer = {
      globalPrice: 0,
      universalPrice: 0,
    };

    switch (getPriceDTO.car.toUpperCase()) {
      case 'AUDI':
        calculatedPrices.globalPrice = 250;
        calculatedPrices.universalPrice = 250 + 0.003 * priceCar;
        break;
      case 'BMW':
        calculatedPrices.globalPrice = 150;
        calculatedPrices.universalPrice = 150 + 0.004 * priceCar;
        break;
      case 'PORSCHE':
        calculatedPrices.globalPrice = 500;
        calculatedPrices.universalPrice = 500 + 0.007 * priceCar;
        break;
      default:
        break;
    }

    return calculatedPrices;
  }

  isPriceRequestValid(getPriceDTO: GetPriceDTO) {
    if (parseFloat(getPriceDTO.price) < 5000) {
      throw new ServiceException(ServiceErrors.VALUE_CAR_TO_LOW);
    }

    if (parseInt(getPriceDTO.age) < 18) {
      throw new ServiceException(ServiceErrors.DRIVER_TO_YOUNG);
    }

    if (
      parseInt(getPriceDTO.age) < 25 &&
      getPriceDTO.car.toUpperCase() === 'PORSCHE'
    ) {
      throw new ServiceException(ServiceErrors.DRIVER_TO_YOUNG_FOR_PORSCHE);
    }

    return true;
  }
}

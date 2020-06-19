import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions() : Promise<Promotion[]>{ // getDishes returns array of Dishes
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string): Promise<Promotion>{ //function with argument id and return type dish
     return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]); //filter return array we select 0 element
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => promo.featured)[0]); // return dish for which featured is true

  }
}

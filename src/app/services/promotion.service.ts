import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions() : Promotion[]{ // getDishes returns array of Dishes
    return PROMOTIONS;
  }

  getPromotion(id: string): Promotion{ //function with argument id and return type dish
     return PROMOTIONS.filter((promo) => (promo.id === id))[0]; //filter return array we select 0 element
  }

  getFeaturedPromotion(): Promotion {
    return PROMOTIONS.filter((promo) => promo.featured)[0]; // return dish for which featured is true

  }
}

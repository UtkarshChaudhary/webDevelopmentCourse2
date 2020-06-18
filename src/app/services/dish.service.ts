import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Dish[]{ // getDishes returns array of Dishes
    return DISHES;
  }

  getDish(id: string): Dish{ //function with argument id and return type dish
     return DISHES.filter((dish) => (dish.id === id))[0]; //filter return array we select 0 element
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0]; // return dish for which featured is true

  }
}

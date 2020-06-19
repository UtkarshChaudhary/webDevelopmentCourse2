import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Promise<Dish[]>{ 
    return Promise.resolve(DISHES);
  }

  getDish(id: string): Promise<Dish>{ //function with argument id and return type dish
     return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); //filter return array we select 0 element
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]); // return dish for which featured is true

  }
}

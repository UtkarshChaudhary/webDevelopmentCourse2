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
    return new Promise(resolve => {
      // simulate server latency with 2 sec. delay
      setTimeout(() => resolve(DISHES), 2000); //2000 for 2 second delay
    });
  }

  getDish(id: string): Promise<Dish>{ //function with argument id and return type dish
    return new Promise(resolve => {
      // simulate server latency with 2 sec. delay
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000); //2000 for 2 second delay
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      // simulate server latency with 2 sec. delay
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000); //2000 for 2 second delay
    });

  }
}

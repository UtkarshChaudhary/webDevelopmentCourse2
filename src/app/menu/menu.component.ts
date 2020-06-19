import { Component, OnInit } from '@angular/core';
import { Dish } from "../shared/dish";
import {DishService} from '../services/dish.service';


@Component({
  selector: 'app-menu', //tag used for importing this component
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] ;  
  
  selectedDish: Dish;

  constructor(private dishService: DishService) { }

  ngOnInit() { // it is executed when the component is created
     this.dishService.getDishes()
     .then((dishes) => this.dishes = dishes); //arrow func is used here
  }
  
  onSelect(dish: Dish){ //dish parameter of type Dish
    this.selectedDish = dish;
  }

}

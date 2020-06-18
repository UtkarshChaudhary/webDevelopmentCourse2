import { Component, OnInit } from '@angular/core';
import { Dish } from "../shared/dish";
import {DISHES} from "../shared/dishes";


@Component({
  selector: 'app-menu', //tag used for importing this component
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes = DISHES; //same as dishes: Dish[] = DISHES; 
  
  selectedDish: Dish;

  constructor() { }

  ngOnInit() {
  }
  onSelect(dish: Dish){ //dish parameter of type Dish
    this.selectedDish = dish;
  }

}

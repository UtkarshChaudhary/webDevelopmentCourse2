import { Component, OnInit, Inject } from '@angular/core'; //Inject interface is used to inject baseURL
import { Dish } from "../shared/dish";
import {DishService} from '../services/dish.service';


@Component({
  selector: 'app-menu', //tag used for importing this component
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] ; 
  errMess: string[]; 

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { } //'BaseURL' is provider we set in app.module

  ngOnInit() { // it is executed when the component is created
     this.dishService.getDishes()
     .subscribe((dishes) => this.dishes = dishes,
     errmess => this.errMess = <any>errmess); //arrow func is used here
  }
  

}

import { Component, OnInit, Input } from '@angular/core';
// Input to input details from DOM
import { Dish } from '../shared/dish';
import {Params, ActivatedRoute} from '@angular/router';
// params is used to input router parameter
import { Location } from '@angular/common';
//location is used to specify location of page in history of web browser
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  
  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.dishService.getDishIds().
    subscribe((dishIds) => this.dishIds =  dishIds);

    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => {this.dish = dish; this.setPrevNext(dish.id); }); //now we get access of params observable
    // here above params is observable by default, now switchmap function takes id value whenever observable changes and call getDish func i.e make new observable getDish()
  }

  setPrevNext(dishId: string){
   const index = this.dishIds.indexOf(dishId);
   this.prev = this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length];
   this.next = this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length];
  }

  goBack(): void {
      this.location.back();
  }

}

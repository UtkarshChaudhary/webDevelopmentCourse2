import { Component, OnInit, Input } from '@angular/core';
// Input to input details from DOM
import { Dish } from '../shared/dish';
import {Params, ActivatedRoute} from '@angular/router';
// params is used to input router parameter
import { Location } from '@angular/common';
//location is used to specify location of page in history of web browser
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  
  dish: Dish;
  
  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .then((dish) => this.dish = dish);
  }

  goBack(): void {
      this.location.back();
  }

}

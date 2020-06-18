import { Component, OnInit, Input } from '@angular/core';
// Input to input details from DOM
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  @Input() // to get this attribute value from DOM
  dish = Dish;
  
  constructor() { }

  ngOnInit() {
  }

}

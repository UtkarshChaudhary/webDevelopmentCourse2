import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
// Input to input details from DOM
import { Dish } from '../shared/dish';
import {Params, ActivatedRoute} from '@angular/router';
// params is used to input router parameter
import { Location } from '@angular/common';
//location is used to specify location of page in history of web browser
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  
  dish: Dish;
  errMess: string[];
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  dishcopy: Dish; //hold copy of modified dish until it is posted to server

  @ViewChild('fform') commentFormDirective;
  formErrors = { // javascript object
    'author': '',
    'rating': '',
    'comment': '',
    'date': '',
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':      'Comment must be at least 2 characters long.'
    },
    'date': {
      'required':      'Date is required.'
    },
  };
  
  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().
    subscribe((dishIds) => this.dishIds =  dishIds);

    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe((dish) => {this.dish = dish; this.dishcopy= dish; this.setPrevNext(dish.id); },
    errmess => this.errMess = <any>errmess); 
  }

  setPrevNext(dishId: string){
   const index = this.dishIds.indexOf(dishId);
   this.prev = this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length];
   this.next = this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length];
  }

  goBack(): void {
      this.location.back();
  }

  formatLabel(value:number){
    return value;
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: [5,Validators.required],
      comment: ['',[Validators.required, Validators.minLength(2)]], 
      date: [Date.now().toString(),Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged();
  }
  
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish; 
      this.dishcopy = dish;
    }, errmess => {
      this.dish = null;
      this.dishcopy = null;
      this.errMess = <any>errmess;
     });
    console.log(this.comment);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({ //this object is used by reset method to reset value
      author: '',
      rating: 5,
      comment: '',
      date: Date.now().toString() 
    });
     
  }

  onValueChanged(data?: any) { // ? meaning that parameter is optional
    if (!this.commentForm) {  // this method is called without creating feedback form
      return; 
    }

    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}

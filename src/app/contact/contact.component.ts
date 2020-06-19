import { Component, OnInit, ViewChild } from '@angular/core'; //ViewChuld to get access of any child element within our DOM
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective; // to get access of template form for reset it to its initial value

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telnum: [0,Validators.required],
      email: ['',Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({ //this object is used by reset method to reset value
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: '' 
    });
    this.feedbackFormDirective.resetForm();
  }

}

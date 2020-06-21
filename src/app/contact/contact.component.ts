import { Component, OnInit, ViewChild, Inject } from '@angular/core'; //ViewChuld to get access of any child element within our DOM
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  errMess: string[];
  feedbackReturned: Feedback;
  contactType = ContactType;

  @ViewChild('fform') feedbackFormDirective; // to get access of template form for reset it to its initial value

  formErrors = { // javascript object
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') private BaseURL ) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0,[Validators.required, Validators.pattern]], //pattern to specifed patters to followed by input
      email: ['',[Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    // valueChanges is a observable provided by form
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation message
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {
      this.feedbackReturned = feedback;
    }, errmess => {
      this.feedbackReturned = null;
      this.errMess = <any>errmess;
    });
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
    setTimeout(() => { 
      console.log("setting feedbackReturned to null");
      this.feedbackReturned = null;
     }, 10000);
  }

  onValueChanged(data?: any) { // ? meaning that parameter is optional
    if (!this.feedbackForm) {  // this method is called without creating feedback form
      return; 
    }

    const form = this.feedbackForm;
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

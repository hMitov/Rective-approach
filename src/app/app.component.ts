import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  genders = [ 'male', 'female' ];
  signUpForm: FormGroup;
  forbiddenUsernames = [ 'Anna', 'Pesho' ];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [ Validators.required, this.forbiddenNames.bind(this) ]),
        'email': new FormControl(null, [ Validators.required, Validators.email ], this.forbiddenEmails)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

    this.signUpForm.statusChanges.subscribe(
      (statusChange) => console.log(statusChange)
    );

    this.signUpForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'Max@test.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'MitakaMadafaka'
      },
      'gender': 'male'
    });

  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const newControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(newControl);
  }

  forbiddenNames(control: FormControl): { [ s: string ]: boolean } {
    if( this.forbiddenUsernames.indexOf(control.value) !== -1 ) {
      return { 'isForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if( control.value === 'test@test.com' ) {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if( control.value === 'test@test.com' ) {
  //         resolve({ 'emailIsForbidden': true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });
  //   return promise;
  // }
}

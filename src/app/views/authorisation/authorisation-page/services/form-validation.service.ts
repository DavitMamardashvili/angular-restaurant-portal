import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  checkPasswordValue(
    form: NgForm,
    formControlName: string,
    secondPasswordName: string | undefined = undefined
  ): PasswordValidationType {
    let password = form.controls[formControlName];
    if (password == undefined || password.touched == false) {
      return PasswordValidationType.passwordIsUndefined;
    }

    if (password.value == undefined || password.value.length == 0) {
      return PasswordValidationType.empty;
    } else if (password.value.length < 8) {
      return PasswordValidationType.symbolsCount;
    } else if (password?.errors?.['pattern']) {
      return PasswordValidationType.patternValidation;
    } else if (secondPasswordName != undefined) {
      let secondPassword = form.controls[secondPasswordName];
      let secondPasswordValidStatus = this.checkPasswordValue(
        form,
        secondPasswordName
      );
      if (secondPasswordValidStatus == PasswordValidationType.ok) {
        if (password.value != secondPassword.value) {
          return PasswordValidationType.passwordDontMatch;
        }
      }
    }

    return PasswordValidationType.ok;
  }

  checkBaseValue(form: NgForm, controlName: string):PasswordValidationType {
    let email = form.controls[controlName];

    if (email == undefined || email.touched == false)
      return PasswordValidationType.ok

    if (email.value == undefined || email.value.length == 0)
      return PasswordValidationType.empty

    else if (email.errors?.['pattern'])
      return PasswordValidationType.patternValidation


      return PasswordValidationType.ok

  }
}


export enum PasswordValidationType {
  ok = 0,
  empty = 1,
  symbolsCount = 2,
  patternValidation = 3,
  passwordDontMatch = 4,
  passwordIsUndefined = 5,

}

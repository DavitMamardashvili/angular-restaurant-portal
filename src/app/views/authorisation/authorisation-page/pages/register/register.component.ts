import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { RegisterInfo } from '../../models/RegisterInfo';
import { EmailAndPassword } from '../../models/EmailAndPassword';
import { FirebaseAuthService } from '../../../../../core/services/firebase/firebase-auth.service';
import { FirestoreService } from '../../../../../core/services/firebase/firestore.service';
import { DynamicHostDirective } from '../../../../../core/directives/dynamic-host.directive';
import { AlertService } from '../../../../../core/services/dynamicComponent/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

  constructor(public validator: FormValidationService,
    private firebaseAuthService: FirebaseAuthService,
    private alertService: AlertService) { }

  onFormSubmit(form: NgForm) {
    if (!form.valid || form.value.password !== form.value.confirmPassword) {
      return;
    }

    const registerInfoObject: any = Object.fromEntries(Object.entries(new RegisterInfo(form.value)));
    const authInfo: EmailAndPassword = new EmailAndPassword(form.value);

    this.firebaseAuthService.registerWhithEmailAndPassword('/users', authInfo, registerInfoObject)
      .then(() => {
        this.alertService.createSuccessAlert(this.dynamicHost, "You have been registered successfully. Please check your email for the verification link.")
      }).catch(() => {
        this.alertService.createErrorAlert(this.dynamicHost, "There was a problem. It's possible that you are already registered with this email address.")
      })
  }
}

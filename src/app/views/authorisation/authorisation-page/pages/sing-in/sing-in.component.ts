import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseAuthService } from '../../../../../core/services/firebase/firebase-auth.service';
import { FormValidationService } from '../../services/form-validation.service';
import { DynamicHostDirective } from '../../../../../core/directives/dynamic-host.directive';
import { AlertService } from '../../../../../core/services/dynamicComponent/alert.service';
import { UserManagerService } from '../../../../../core/services/userState/user-manager.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent {
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;
  emailVerified:boolean = false

  constructor(private firebaseAuthService: FirebaseAuthService,
    public validator: FormValidationService,
    private alertService: AlertService,
    private userManager: UserManagerService) {

  }


  onFormSubmit(form: NgForm) {
    if (!form.valid)
      return;

    this.firebaseAuthService.signInWithEmailAndPassword(form.value.email, form.value.password).then(observResponse => {
      observResponse.subscribe((response: any) => {
        if (response?.user?.emailVerified) {
          this.userManager.setUid(response.user.uid);
          this.userManager.setUserInfo(response.user.additionalData);
        }
        else if (!response?.user?.emailVerified) {
          if(!this.emailVerified)
          this.firebaseAuthService.signOut().then(() => this.alertService.createErrorAlert(this.dynamicHost, "Please check your email for the verification link."));
          this.emailVerified =true
        }
      });
    }).catch(() => {
      this.alertService.createErrorAlert(this.dynamicHost, "There was a problem. It's possible that you ar'n registered with this email address")

    });
    form.resetForm();
  }

  onResetPasswordBtnClick() {
    Swal.fire({
      title: "Enter your email address",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Sent reset link",
      showLoaderOnConfirm: true
    })
      .then((result) => {
        this.firebaseAuthService.resetPassword(result.value).then(response => {
          Swal.fire("Reset link was send successfully");
        })
      });
  }

}

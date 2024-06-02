import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseAuthService } from '../../../../../core/services/firebase/firebase-auth.service';
import { FormValidationService } from '../../services/form-validation.service';
import { UserManagerService } from '../../../../../core/services/userState/user-manager.service';
import { NgForm } from '@angular/forms';
import { RegisterInfo } from '../../models/RegisterInfo';
import { FirestoreService } from '../../../../../core/services/firebase/firestore.service';
import { DynamicHostDirective } from '../../../../../core/directives/dynamic-host.directive';
import { AlertService } from '../../../../../core/services/dynamicComponent/alert.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;
  userInfo: any;

  constructor(private firebaseAuthService: FirebaseAuthService,
    public validator: FormValidationService,
    public userManager: UserManagerService,
    private firebaseClientService: FirestoreService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.userInfo = this.userManager.getUserInfo();
  }

  onFormSubmit(form: NgForm) {
    if (!form.valid || form.value.newPassword !== form.value.confirmNewPassword) {
      return;
    }
    
    form.value['email'] = this.userInfo.email
    this.firebaseAuthService.updatePassword(form.value.password, form.value.newPassword)
      .then(() => {
        let filterData = Object.fromEntries(Object.entries(new RegisterInfo(form.value)));
        this.firebaseClientService.update('/users', this.userManager.getUid(), filterData)
          .then(() => {
            this.firebaseClientService.readById('/users', this.userManager.getUid()).subscribe(response => {
              this.userManager.setUserInfo(response);
              this.alertService.createSuccessAlert(this.dynamicHost, "User information was updated")
            })
          })
      })
      .catch(error => {
        this.alertService.createErrorAlert(this.dynamicHost, "Are you sure that it's your correct password?")
      });
}}

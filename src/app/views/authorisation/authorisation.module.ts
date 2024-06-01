import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorisationPageComponent } from './authorisation-page/authorisation-page.component';
import { RegisterComponent } from './authorisation-page/pages/register/register.component';
import { SingInComponent } from './authorisation-page/pages/sing-in/sing-in.component';
import { UpdateComponent } from './authorisation-page/pages/update/update.component';
import { AuthorisationRoutingModule } from './authorisation-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [
    AuthorisationPageComponent,
    RegisterComponent,
    SingInComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AuthorisationRoutingModule,
    FormsModule,
    SharedModule,
    CoreModule
  ]
})
export class AuthorisationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authorisation-page/pages/register/register.component';
import { SingInComponent } from './authorisation-page/pages/sing-in/sing-in.component';
import { UpdateComponent } from './authorisation-page/pages/update/update.component';
import { AuthorisationPageComponent } from './authorisation-page/authorisation-page.component';


const routes: Routes = [
  {
    path: '', component: AuthorisationPageComponent,
     children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SingInComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'update', component: UpdateComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthorisationRoutingModule { }

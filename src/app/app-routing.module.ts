import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './authentication/register/register.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
   { path: 'login', component: LoginComponent }
  ,{ path: 'register', component: RegisterComponent }
  ,{ path: 'surveys', component: SurveyListComponent }
  ,{ path: '', component: HomeComponent }
  ,{ path: '**', redirectTo: 'surveys', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../app/component/home/home.component';
import { RegisterComponent } from '../app/component/register/register.component';
import { LoginComponent } from '../app/component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { FavouritesComponent } from './component/favourites/favourites.component';
import { VerifyEmailComponent } from '../app/component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from '../app/component/forgot-password/forgot-password.component';
import { ProfileComponent } from '../app/component/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'team', component: TeamComponent },
  { path: 'fav', component: FavouritesComponent},
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component:ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

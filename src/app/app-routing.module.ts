import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo, isNotAnonymous } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

import { HomeComponent } from '../app/component/home/home.component';
import { RegisterComponent } from '../app/component/register/register.component';
import { LoginComponent } from '../app/component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { FavouritesComponent } from './component/favourites/favourites.component';
import { VerifyEmailComponent } from '../app/component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from '../app/component/forgot-password/forgot-password.component';
import { ProfileComponent } from '../app/component/profile/profile.component';
import { ReviewComponent } from '../app/component/review/review.component';
import { RevFormComponent } from '../app/component/reviewForm/revForm.component';
import { ContactFormComponent } from '../app/component/contact-form/contact-form.component';
import { AuthGuard } from './auth.guard';
import { OrderComponent } from '../app/component/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'fav', component: FavouritesComponent, canActivate: [AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component:ProfileComponent, canActivate: [AuthGuard] },
  { path: 'review', component: ReviewComponent },
  { path: 'rev', component: RevFormComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

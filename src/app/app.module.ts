import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { StaffComponent } from './component/sablon/sablon.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { FavouritesComponent } from './component/favourites/favourites.component';
import { FavFoodComponent  } from './component/sablonFood/sablonFood.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ReviewComponent } from './component/review/review.component'
import { RevFormComponent } from './component/reviewForm/revForm.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TeamComponent,
    StaffComponent,
    FavouritesComponent,
    FavFoodComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ReviewComponent,
    RevFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

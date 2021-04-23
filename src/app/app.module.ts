import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { OrderComponent } from './component/order/order.component';
import { CartComponent } from './component/cart/cart.component';
import { MainFavComponent} from './component/mainFavourite/mainFav.component';
import { DailymenuComponent } from './component/dailymenu/dailymenu.component';
import {JoinComponent} from './component/join/join.component';

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
    RevFormComponent,
    ContactFormComponent,
    OrderComponent,
    CartComponent,
    MainFavComponent,
    DailymenuComponent,
    JoinComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
  ],
  providers: [ 
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

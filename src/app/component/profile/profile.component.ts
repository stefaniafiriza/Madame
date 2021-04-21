import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../../models/user';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  url: string;
  photoF: File;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: AngularFireStorage,
    private cookie: CookieService
  ) { 
    this.user = {
      Name: '',
      password: '',
      email: '',
      phone: 407,
      address: '',
      products: [],
      photo: ''
    };
  }

  u: User;
  emailUser: string = this.cookie.get('usernameCookie');

  ngOnInit(): void {
    this.auth.getUser(this.emailUser).subscribe(
      (users: User[]) => {
        for (this.u of users) {
          if (this.u.email === this.emailUser){
            this.url = this.u.photo;
          }
        }
      }
    );
  }

  name: string = this.cookie.get('nameUserCookie');
  userPassword: string = this.auth.password;
  email: string;
  newPassword: string;

  sendHome() {
    this.router.navigate(['/home']);
  }

  changeEmail() {
    this.auth.changeEmail(this.userPassword,this.email);
  }

  changePassword() {
    this.auth.resetPassword(this.newPassword);
  }

  onSelectFile($event) {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); 

      reader.onload = (event) => { 
        this.url = event.target.result as string;
      }
    }

    this.photoF = $event.target.files[0] as File;
    this.savePhotoToStorage();
  }

  async savePhotoToStorage() {
    const photoId = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref('profile-images/' + photoId);
    this.task = this.ref.put(this.photoF);
    this.task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.storage.ref('profile-images/' + photoId)
            .getDownloadURL()
            .subscribe(downloadUrl => {
              console.log(downloadUrl);
              this.auth.updateProfile(downloadUrl);
            });
        })
      ).subscribe();
  }

  public delete() {
    this.url = null;
  }

}

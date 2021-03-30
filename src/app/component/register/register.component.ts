import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../service/auth.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, last } from 'rxjs/operators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  error: any;
  confirmPassword: any;
  url: string;
  photoF: File;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  us: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: AngularFireStorage,
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

  ngOnInit(): void {
    this.auth.eventAuthError$.subscribe(error => {
      this.error = error;
    })
  }

  registerUser () {
    this.auth.registerUser(this.user);
  }

  sendLogin () {
    this.router.navigate(['/login']);
  }

  sendHome(){
    this.router.navigate(['']);

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
            .getDownloadURL().subscribe(downloadUrl => {
              this.auth.photo = downloadUrl;
            })
        })
      
      ).subscribe();
  }
}

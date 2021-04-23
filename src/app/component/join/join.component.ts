import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { firestore } from 'firebase';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuid } from 'uuid';
import { Join } from './join';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css',
'../../nav.css',
'../../../assets/css/bootstrap.min.css',
'../../../assets/css/bootstrap-grid.css',]
})
export class JoinComponent implements OnInit {

  mdlSampleIsOpen: boolean = false;
  user: User | null = null;
  mail = new FormControl('');
  name = new FormControl('');
  phone = new FormControl('');
  coverText = new FormControl('');
  cv: File;
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  url: string;
  constructor(
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService,
    private storage: AngularFireStorage,
    
  ){ }

  ngOnInit(): void {
  
  }

 
  onSelectFile($event) {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); 

      reader.onload = (event) => { 
        this.url = event.target.result as string;
      }
    }

    this.cv = $event.target.files[0] as File;

  }

  async saveCVToStorage(path: string) {
    this.ref = this.storage.ref(path);
    this.task = this.ref.put(this.cv);
    this.task.snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("Finished")
        })
      
      ).subscribe();
  }

  sendHome() {
    this.router.navigate(['./home']);
  }

  
  sendRegister() {
    this.router.navigate(['/register']);
  }

  sendLogin() {
    this.router.navigate(['/login']);
  }
  
  sendFav() {
    this.router.navigate(['./mainFav']);
  }
  sendContact(){
    this.router.navigate(['./contact']);
  }
  sendMenu(){
    this.router.navigate(['../order']);
  }
  sendTeam() {
    this.router.navigate(['./team']);
  }
  sendReview() {
    this.router.navigate(['./review']);
  }
  openModal(open: boolean): void {
    this.mdlSampleIsOpen = open;
  }

  send(){
    let rev: Join = {
      name: this.user !== null ? this.user.Name : this.name.value,
      coverText: this.coverText.value,
      phone: this.phone.value,
      mail: this.mail.value,
      id: uuid(),
    };

    let collection = "site";
    let doc = "applications";
    let cvPath = `${collection}/${doc}/${rev.id}/cv`


    rev.cv = cvPath;

    const update: any = {};
    update[rev.id] = {
      ...rev,
    };

    delete update[rev.id].id;

    let ref = firestore().collection(collection).doc(doc);

    ref.update(update).finally(() => {

      this.mdlSampleIsOpen=false;
      this.saveCVToStorage(cvPath)
      
    })
    
  }
  hideBarLink: boolean = false;
  logged: boolean =
    this.auth.isLogged == false
      ? (this.hideBarLink = false)
      : (this.hideBarLink = true);


    
}

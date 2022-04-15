import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from "firebase/app";
import "firebase/auth";
import { Agence } from '../models/Agence.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newAgence: any;

  agence;
  agenceSubject = new Subject<any[]>();

  agencesCollection: AngularFirestoreCollection <Agence>;
  agences: Observable <Agence[]>;
isAuth= false;

  constructor(private afAuth: AngularFireAuth,
    private HttpClient : HttpClient,
    private db: AngularFirestore,
    private router: Router) {
   


      this.agencesCollection = this.db.collection('agences');

      this.agences = this.db.collection('agences').snapshotChanges().map(changes =>{
        return changes.map(a => {
          const data = a.payload.doc.data() as Agence;
          data.id = a.payload.doc.id;
          return data;
        });
       });   
     }  
     
     

     form = new FormGroup({
      id: new FormControl(null),
      admin: new FormControl('',[ Validators.required]),
      nom: new FormControl('', Validators.required),
      localite: new FormControl('', Validators.required),
      telephone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^[0-9]\d*$/)]),
      adresse: new FormControl('',[ Validators.required]),
      ville: new FormControl('',[ Validators.required]),
      email: new FormControl('', Validators.email),
     psw: new FormControl('', [Validators.required, Validators.minLength(6)]),
     pswrepeat: new FormControl('', Validators.required)
    
    });


    formComparaison= new FormGroup({
      
      depart: new FormControl('',[ Validators.required]),
      arrive: new FormControl('', Validators.required),
    
    });



    getUserState(){
      return this.afAuth.authState;
    }
    
    login(email: string, password: string){
  this.isAuth=true;
this.afAuth.signInWithEmailAndPassword(email,password)
.catch(error =>{
  this.eventAuthError.next(error);
})
.then(userCredential =>{
  if(userCredential){
    this.router.navigate(['/liste']); 
  }
})
    }
    
  createUser(agence){
    
    this.afAuth.createUserWithEmailAndPassword(agence.email, agence.psw)
     .then( userCredential=>{
       this.newAgence = agence;

       console.log(userCredential);

       userCredential.user.updateProfile({
         displayName: agence.nom + ' ' + agence.telephone + ' ' + agence.email +' '+ agence.localite
       });

       this.insertUserData(userCredential)
       .then(()=> {
        this.router.navigate(['/index']);
       });
     })
     .catch(error => {
      this.eventAuthError.next(error);
     })
  }

  insertUserData(userCredential: firebase.auth.UserCredential){
 
      return this.db.doc('Users/${userCredential.uid}').set({
       // admin:this.agence.admin,
        nom: this.newAgence.nom,
        localite: this.newAgence.localite,
        telephone: this.newAgence.telephone,
        adresse: this.newAgence.adresse,
        ville:this.newAgence.ville,
        email: this.newAgence.email,      
        role: 'network user'
      })
  }

  logout(){
    return this.afAuth.signOut()
    
  }

  emitSociete(){
    this.agenceSubject.next(this.agence);
  }


  getAgences(){
    return this.agences;
  }


  addAgence(agence: Agence){
    this.agencesCollection.add(agence);
       }   

  
}


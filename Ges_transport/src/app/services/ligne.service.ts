import { Injectable } from '@angular/core';
import { Ligne } from '../models/ligne.model';
import { AngularFirestore } 
from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  lignes: Observable <Ligne[]>;

  constructor(public afs: AngularFirestore) { 
    this.lignes = this.afs.collection('lignes').valueChanges();
  }

  getLignes(){
    return this.lignes;
  }
}

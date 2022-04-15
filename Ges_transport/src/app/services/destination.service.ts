import { Injectable } from '@angular/core';
import { Destination } from '../models/destination.model';
import { AngularFirestore } 
from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Agency } from '../models/Agency.model';
import { Tarification } from '../models/tarification.models';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

destinations: Observable <Destination[]>;
agency: Observable <Agency[]>;
tarifications: Observable <Tarification[]>;

  constructor(public afs: AngularFirestore) {
    this.destinations = this.afs.collection('destinations').valueChanges();
    this.tarifications = this.afs.collection('tarifications').valueChanges();
    this.agency = this.afs.collection('agency').valueChanges();

   } 

   getDestinations(){
    return this.destinations;
  }

   getAgency(){
    return this.agency;
  }

  
  getTarification(){
    return this.tarifications;
  }
}

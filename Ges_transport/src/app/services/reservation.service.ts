import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Transaction } from '../models/transaction.model';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



declare function sendMailDelete(): any;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

   status: string;
  transaction_id: string;
  amount: string;
  transaction_date: string;
  Reference: string;
  PaymentMethod: string;
  paymentID: string;

  constructor(public afs: AngularFirestore, private firebase: AngularFireDatabase,
   private route: ActivatedRoute,) {

   this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.transaction_id = params['transaction_id'];
      this.amount = params['amount'];
      this.transaction_date = params['transaction_date'];
      this.Reference = params['Reference'];
      this.PaymentMethod = params['PaymentMethod'];
      this.paymentID = params['paymentID'];
     
  });
  }

   
   //Modification des réservation

   reservationList: AngularFireList <Reservation>;
   transactionList: AngularFireList <Transaction>;

   
   form = new FormGroup({
     id: new FormControl(null),
     nom: new FormControl('',[ Validators.required]),
     prenom: new FormControl('', Validators.required),
     email: new FormControl('', Validators.email),
     telephone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^[0-9]\d*$/)]),
     depart: new FormControl('', Validators.required),
     destination: new FormControl('', Validators.required),
     tarif: new FormControl('', Validators.required),
     dateReservation: new FormControl('', Validators.required),
     dateEnvoi: new FormControl('', Validators.required),
     Reference: new FormControl(Math.random ().toString(36).replace(/ [^ az] + /,''),Validators.required),
    // dateValidation: new FormControl(''),
     heureDepart: new FormControl('', Validators.required),
     adresse: new FormControl('', Validators.required),
     //etat: new FormControl('validé', Validators.required),
    agence: new FormControl('',[Validators.required, Validators.email]),
    //numeroagence: new FormControl('', [Validators.required, Validators.minLength(9), Validators.pattern(/^[0-9]\d*$/)]),

     
   });

  
       insertReservation(reservation){
        this.firebase.list('/reservations').push({
             nom:reservation.nom,
             prenom:reservation.prenom,
             email:reservation.email,
             telephone:reservation.telephone,
             depart:reservation.depart,
             destination:reservation.destination,
             tarif:reservation.tarif,
             dateReservation: reservation.dateReservation,
             dateEnvoi: reservation.dateEnvoi,
             Reference: reservation.Reference,
             //dateValidation: reservation.dateValidation,
             heureDepart:reservation.heureDepart,
             adresse: reservation.adresse,
             //etat:reservation.etat,
            agence:reservation.agence,
            // numeroagence:reservation.numeroagence
        });
           }
          

   getCustomers(){
this.reservationList = this.firebase.list('reservations'); 
return this.reservationList.snapshotChanges();
   }


   insertTransaction(transaction){
    this.firebase.list('/transactions').push({

      status :this.status,
      transaction_id :this.transaction_id,
      amount : this.amount,
      transaction_date : this.transaction_date,
      Reference : this.Reference,
      PaymentMethod : this.PaymentMethod,
      paymentID : this.paymentID
         
    });
       }

    
getTransaction(){
this.transactionList = this.firebase.list('transactions'); 
return this.transactionList.snapshotChanges();
}



   insertCustomer(reservation){
this.reservationList.push({
     nom:reservation.nom,
     prenom:reservation.prenom,
     email:reservation.email,
     telephone:reservation.telephone,
     depart:reservation.depart,
     destination:reservation.destination,
     tarif:reservation.tarif,
     dateReservation: reservation.dateReservation,
     dateEnvoi: reservation.dateEnvoi,
     Reference: reservation.Reference,
    // dateValidation: reservation.dateValidation,
     heureDepart:reservation.heureDepart,
     adresse: reservation.adresse,
    // etat:reservation.etat,
    agence:reservation.agence,
     //numeroagence:reservation.numeroagence
});
   }

  
   populateForm(reservation){
     this.form.setValue(reservation);
   }

   updateCustomer(reservation){
     this.reservationList.update(reservation.id,
      {
        nom:reservation.nom,
        prenom:reservation.prenom,
        email:reservation.email,
        telephone:reservation.telephone,
        depart:reservation.depart,
        destination:reservation.destination,
        tarif:reservation.tarif,
        dateReservation: reservation.dateReservation,
        dateEnvoi: reservation.dateEnvoi,
       Reference: reservation.Reference,
        heureDepart:reservation.heureDepart,
        adresse: reservation.adresse,
       // etat:reservation.etat,
      agence:reservation.agence,
       // numeroagence:reservation.numeroagence
      });
   }


   deleteCustomer(id: string){
    this.reservationList.remove(id);
   }


   //pour tout supprimer
   deleteTransaction(id: string){
      this.transactionList.remove(id);
   }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService} from '../services/reservation.service';
import { Transaction } from '../models/transaction.model';
import { AbstractControl } from '@angular/forms';
import * as firebase from 'firebase';

declare function sendMail(): any;


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  status: string;
  transaction_id: string;
  amount: string;
  transaction_date: string;
  Reference: string;
  PaymentMethod: string;
  paymentID: string;

  transactions: Transaction[];
  array: any;

  constructor(private route: ActivatedRoute,
    private ReservationService: ReservationService,
    private router: Router
    ) {

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

  ngOnInit(): void {

    this.ReservationService.insertTransaction(

      this.route.queryParams.subscribe(params => {
        this.status = params['status'];
        this.transaction_id = params['transaction_id'];
        this.amount = params['amount'];
        this.transaction_date = params['transaction_date'];
        this.Reference = params['Reference'];
        this.PaymentMethod = params['PaymentMethod'];
        this.paymentID = params['paymentID'];

       
        
       
    })

    )
      
     }
/*
     checkIfEmailExistsInDatabase(control: AbstractControl) {
      return new Promise(resolve => {
          // On vérifie qu'il n'y a pas de document au même nom de ce qu'il y'a dans le formControl
          firebase.list('transactions').where('Ref', '==', control.value).get()
              .then(snapshot => {
                  snapshot.forEach(doc => {
                      if (!doc.exists) {
                          console.log('L\'email n\'existe pas');
                          resolve(null);
                          // ERREUR : Le statut de la validation reste en "PENDING"
                          // Alors qu'il doit normalement faire passer à l'étape d'après
                      } else {
                          console.log('L\'email existe déjà');
                          resolve({ 'notunique' : true });
                          // Un message d'erreur s'affiche bien et bloque la validation
                      }
                  })
              });
      });
  }
*/
    
  }




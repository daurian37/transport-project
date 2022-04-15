import { Component, OnInit } from '@angular/core';
import "firebase/auth";
import firebase from "firebase/app";
import { ReservationService } from '../services/reservation.service';
import { Transaction } from '../models/transaction.model';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
  providers: [DatePipe]
})
export class TransactionPageComponent implements OnInit {

  user: firebase.User;
  userSubscription: Subscription;
  
  transactions: Transaction[];

  myDate = new Date();
  test:string;

  constructor(
    private ReservationService : ReservationService, 
    private datePipe: DatePipe,
    ) { 

      this.test = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    }

 showDeletedMessage: boolean;
 searchText : string ="";

  ngOnInit(): void {

    this.ReservationService.getTransaction().subscribe(
      transactions  => {
        this.transactions  = transactions .map(transactions  => {
          return {
            id: transactions .key,
            ...transactions .payload.val()
          };
        });
      });
 

   }

    
  filterCondition(transaction){
    
    return transaction.Reference.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
 
}



   onDeleted(id){

    if(confirm('En supprimant cet enregistrement il ne pourra plus être récupéré. Continuer quand même ?')){
     
      this.ReservationService.deleteTransaction(id);
  
  
  
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";
import { DestinationService } from '../services/destination.service';
import { ReservationService } from '../services/reservation.service';
import { Destination } from '../models/destination.model';
import { Reservation } from '../models/reservation.model';
import { DatePipe } from '@angular/common';
import { Ligne } from '../models/ligne.model';
import { LigneService } from '../services/ligne.service';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';
//import { NgForm } from '@angular/forms';


declare function sendMailDelete(mail,agence): any;


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css'],
  providers: [DatePipe, Md5]
})
export class ListReservationComponent implements OnInit{

  myGroup = this.ReservationService.form;
  lignes: Ligne[];
  reservations: Reservation[];
  user: firebase.User;
  userSubscription: Subscription;
  
  destinations: Destination[];
  transactions: Transaction[];


  myDate = new Date();
  test:string;

  ref=Math.random ().toString(36).replace(/ [^ az] + /,'');
  Reference=this.ref;

  constructor(private auth: AuthService,
    private http: HttpClient,
    private LigneService: LigneService,
    private ReservationService : ReservationService, 
    private DestinationService : DestinationService, 
    private router: Router,
    private datePipe: DatePipe,
    private _md5:Md5) {

      this.test = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      
     }

    submitted: boolean;
    showSuccessMessage: boolean;
    formControls = this.ReservationService.form.controls;

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
 

  this.ReservationService.getCustomers().subscribe(
    reservations => {
      this.reservations = reservations.map(reservations => {
        return {
          id: reservations.key,
          ...reservations.payload.val()
        };
      });
    });

  

   this.auth.getUserState() 
       .subscribe( user =>{
         this.user = user;
       })

       
    this.DestinationService.getDestinations().subscribe(destinations => {

      // console.log(destinations);
       this.destinations = destinations;
     });

     this.LigneService.getLignes().subscribe(lignes => {

      // console.log(destinations);
       this.lignes = lignes;
     });
  }

  
  login(){
    this.router.navigate(['/gestion']);
  }

  logout(){

    this.auth.logout().then(() => this.router.navigate(['/gestion']));
  }

  register(){
    this.router.navigate(['/gestion']);
  }

  
  onSubmit(){
this.submitted = true;

if(this.ReservationService.form.valid){

if(this.ReservationService.form.get('id').value == null)
this.ReservationService.insertCustomer(this.ReservationService.form.value);
else
this.ReservationService.updateCustomer(this.ReservationService.form.value);

this.showSuccessMessage= true;
setTimeout(() => this.showSuccessMessage = false, 3000);
  this.submitted =false;
  this.ReservationService.form.reset();
}

  }


  onDelete(id, mail,agence){

      if(confirm('En supprimant cet enregistrement il ne pourra plus être récupéré. Continuer quand même ?')){
       
        this.ReservationService.deleteCustomer(id);



        this.showDeletedMessage = true;
        setTimeout(() => this.showDeletedMessage = false, 3000);
      }
      
  }


  filterCondition(reservation){
    
    return reservation.telephone.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
 
}

    }
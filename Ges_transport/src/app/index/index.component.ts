import { Component,Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import firebase from "firebase/app";
import "firebase/auth";
import { Agence } from '../models/Agence.model';
import { AuthService } from '../services/auth.service';
import { ContactService } from '../services/contact.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Md5 } from 'ts-md5';
import { Destination } from '../models/destination.model';
import { DestinationService } from '../services/destination.service';
import { Agency } from '../models/Agency.model';


//declare function myTest(): any;
declare function sendMailSuggestions(): any;
//declare var emailjs :any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DatePipe, Md5]
})

export class IndexComponent implements OnInit {

  destinations: Destination[];
  agency: Agency[];

  name:String;
  result:String;
  p:number = 1; 
  
  agences: Agence[];
  user: firebase.User;
  userSubscription: Subscription;

  @Input() id:number;

  societe: any[];
  societeSub: Subscription;

  formControls = this.AuthService.formComparaison.controls;
  myGroup = this.AuthService.formComparaison;
  submitted: boolean;

  constructor(private router: Router,
    private AuthService: AuthService,
    private DestinationService : DestinationService,
    private http: HttpClient,
    private ContactService : ContactService) {
    
    }

     searchText: string ="";
     searchTextDepart: string ="";
     searchTextArrive: string ="";
     

  ngOnInit() {

   //sendMail();
   
   this.DestinationService.getDestinations().subscribe(destinations => {

    // console.log(destinations);
     this.destinations = destinations;
   });

   this.DestinationService.getAgency().subscribe(agency => {

     this.agency = agency;
   });
 
  
  this.AuthService.emitSociete();

  this.AuthService.getAgences().subscribe(agences => {
     this.agences = agences;
   });

    
    this.AuthService.getAgences().subscribe(agences => {
       this.agences = agences;
     });

  } 

  
   filterCondition(agence){
    return agence.nom.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
     
  }


  filterConditionDepart(agc){
    return agc.depart.toLowerCase().indexOf(this.searchTextDepart.toLowerCase()) != -1;
     
  }

  filterConditionArrive(agc){
    return agc.arrive.toLowerCase().indexOf(this.searchTextArrive.toLowerCase()) != -1;
     
  }



  onSubmit(){
    this.submitted = true;
    
    if( this.AuthService.formComparaison.valid){
    
      

    }
    
      } 
  
  /* Fin Ajout */

 onClick() {

  sendMailSuggestions();

  }


}

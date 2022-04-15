import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import "firebase/auth";
import { Destination } from '../models/destination.model';
import { DestinationService } from '../services/destination.service';
import { ReservationService} from '../services/reservation.service';
import { Reservation} from '../models/reservation.model';
import { Agence } from '../models/Agence.model';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import { Ligne } from '../models/ligne.model';
import { LigneService } from '../services/ligne.service';
import { HttpClient } from '@angular/common/http';
import { Agency } from '../models/Agency.model';
import { Tarification } from '../models/tarification.models';
import { AngularFirestore} from '@angular/fire/firestore';


declare function sendMail(): any;


@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
  providers: [DatePipe]
})
export class AcceuilComponent implements OnInit {

  reservations: Reservation[];
  lignes: Ligne[];
  agency: Agency[];
  results:any;
  tarifications:Tarification[];
  
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.ReservationService.form.controls;
  myGroup = this.ReservationService.form;
 
  destinations: Destination[];
  agences: Agence[];
  agence: any;

  id: string;
  localite: string;
  nom: string;
  telephone: string;
  email: string;
   
  /*@Input() id:number;*/

  reserver: any[];
  reservationSub: Subscription;
  
  myDate = new Date();
  test:string;
  
  ref=Math.random ().toString(36).replace(/ [^ az] + /,'');
  Reference=this.ref;

 montant=this.myGroup.get('tarif').value;
 mnt= this.montant;

 searchValue: string = "";


  constructor(private AuthService:AuthService,
    public afs: AngularFirestore,
    private DestinationService : DestinationService, 
    private LigneService: LigneService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ReservationService: ReservationService,
    private datePipe: DatePipe) { 
      this.test = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }

    searchText : string ="";
    searchTextDepart: string ="";
     searchTextArrive: string ="";

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.nom = params.get('nom');
      this.localite = params.get('localite');
      this.telephone = params.get('telephone');
      this.email = params.get('email');
    });
 

    this.DestinationService.getDestinations().subscribe(destinations => {

      // console.log(destinations);
       this.destinations = destinations;
     });

     this.DestinationService.getAgency().subscribe(agency => {

      // console.log(destinations);
       this.agency = agency;
     });
     
     this.DestinationService.getTarification().subscribe(tarifications => {

      // console.log(destinations);
       this.tarifications = tarifications;
     });


     this.LigneService.getLignes().subscribe(lignes => {

      // console.log(destinations);
       this.lignes = lignes;
     });
  }

  onSubmit(){
    this.submitted = true;
    
    if( this.ReservationService.form.valid){
    
    if(this.ReservationService.form.get('id').value == null)
    this.ReservationService.insertReservation(this.ReservationService.form.value);

    this.showSuccessMessage= true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted =false;
      this.ReservationService.form.reset();

          sendMail();
      return this.router.navigate(['paiement', {identifiant:this.ref,montant:this.montant}]);

    }
    
      } 

      downloadPDF(){
        console.log('downloading...');

        const doc = new jsPDF();
        doc.text('hello there', 15, 15);

        doc.save('Votre reservation.pdf'); 
      }

      filterCondition(destination){
        return destination.designation.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
         
      }

      filterConditionDepart(agc){
        return agc.depart.toLowerCase().indexOf(this.searchTextDepart.toLowerCase()) != -1;
         
      }
    
      filterConditionArrive(agc){
        return agc.arrive.toLowerCase().indexOf(this.searchTextArrive.toLowerCase()) != -1;
         
      }

}


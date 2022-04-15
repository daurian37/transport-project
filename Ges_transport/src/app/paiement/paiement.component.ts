import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  url ="https://epaycongo.com/payment";
  
  key='683aff8da855dbae0301173f4f1fdb0cb1734c78';
  token='953fc21e70461902b27d49b31b195c482f88fbf8';

  sign='4c24edf1f97e1dd5a9f5dd3be68706eb';

 successurl='http://localhost:4200/success';
 cancelurl='http://localhost:4200/success';

//  successurl='http://agency-de605.firebaseapp.com/success';
//  cancelurl='http://agency-de605.firebaseapp.com/success';
  currency = 'CFA';
  acid=171;
  emailId='dv.balenvokolo@gmail.com';

  

identifiant: string;
montant: string;

  constructor(

    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
 
  ) { 

  } 

  ngOnInit(): void {

    this.identifiant = this.route.snapshot.paramMap.get('identifiant');
    this.montant = this.route.snapshot.paramMap.get('montant');
  }

}
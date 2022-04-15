import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

 today;  
secondes: number;
  nombreSecondes: any;
  constructor() { }

  ngOnInit(): void {

/*
    //observable pour afficher le nombre de secondes sur le header
    const connexionTime = interval(1000);

this.nombreSecondes = connexionTime.subscribe(
  (value: number) =>{ 
    this.secondes = value;
  }
)
*/
  }

  ngOnDestroy(){
    this.nombreSecondes.unsubscribe();
  }

}

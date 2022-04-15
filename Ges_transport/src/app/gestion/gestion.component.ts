import { Component, OnInit } from '@angular/core';
import { Agence } from '../models/Agence.model';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
 
  formControls = this.AuthService.form.controls;
  myGroup = this.AuthService.form;
  submitted: boolean;
  showSuccessMessage: boolean;
  agence: Agence[];
  
  authError:any;
  showModal=false;

 
  constructor(private AuthService:AuthService) { 

  }

  ngOnInit(): void {
    
this.AuthService.eventAuthError$.subscribe( data => {
  this.authError = data;
})

}


onSubmit(){
  this.submitted = true;
  
  if( this.AuthService.form.valid){
  
  if(this.AuthService.form.get('id').value == null)
  
  
  this.AuthService.createUser(this.AuthService.form.value); 
 this.AuthService.addAgence(this.AuthService.form.value);

  this.showSuccessMessage= true;
  setTimeout(() => this.showSuccessMessage = false, 3000);
    this.submitted =false;
    this.AuthService.form.reset();
  }
  
    } 



login(frm){
  this.AuthService.login(frm.value.email, frm.value.password);
 
}

}

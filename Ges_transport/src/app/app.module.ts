import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ForOForComponent } from './for-o-for/for-o-for.component';
  
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionComponent } from './gestion/gestion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import {  AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {  AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { ContactService } from './services/contact.service';
import { ReservationService } from './services/reservation.service';
import { DestinationService } from './services/destination.service';
import { GuardService } from './services/guard.service';
import 'rxjs/add/operator/map';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaiementComponent } from './paiement/paiement.component';
import { SuccessComponent } from './success/success.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['index']); 

const appRoutes : Routes =[
  
  {path: 'index', component:IndexComponent},
  {path: 'index/:id:nom:localite:email:telephone', component:AcceuilComponent},
  {path: 'gestion', component:GestionComponent},
  {path: 'about', component:AboutComponent},
  {path: 'liste', component:ListReservationComponent},
  {path: 'success', component:SuccessComponent},
  {path: 'acceuil', component:AcceuilComponent},
   {path: 'paiement', component:PaiementComponent},
   {path: 'transactionPage', component:TransactionPageComponent},
  {path: 'index/:id:nom:localite:email:telephone/:identifiant:montant', component:PaiementComponent},
  {path: '' , component:IndexComponent, pathMatch:'full',
  canActivate:[AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
 {path: 'not-found' , component: ForOForComponent},
  {path: '**' , redirectTo: '/not-found' }
];


/*,canActivate:[GuardService] sur liste*/

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AcceuilComponent,
    ForOForComponent,
    HeaderComponent,
    FooterComponent,
    GestionComponent,
    AboutComponent,
    ListReservationComponent,
    PaiementComponent,
    SuccessComponent,
    TransactionPageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'transport-project'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxPaginationModule,    
 
  ],
  providers: [
    AuthService,
    ContactService,
    ReservationService,
    DestinationService,
    GuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

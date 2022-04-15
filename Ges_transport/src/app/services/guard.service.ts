import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }
// A revoir 

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  if(this.authService.isAuth) {
    return true;
  } else {
    this.router.navigate(['/index']);
  }
}
}

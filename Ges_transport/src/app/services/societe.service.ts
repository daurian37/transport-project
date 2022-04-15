import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class SocieteService {

  constructor(private http : HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>('https://epaycongo.com/payment');
  }
}



import { Injectable } from '@angular/core';


import {Http} from '@angular/http';
import {map} from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ServidorProviderService {

  constructor(private httpClient: HttpClient) {
  }

// tslint:disable-next-line: no-inferrable-types
  url: string = 'http://localhost/phpCodigo/';

// tslint:disable-next-line: deprecation
//  constructor(public http: Http) {

//  }

  urlGet() {
    return this.url;
  }

  getPegar() {
   //  return this.http.get(this.url + 'dados.php').pipe(map(res => res.json()));

    return this.httpClient.get<Array<any>>(this.url + 'dados.php');

  }

}

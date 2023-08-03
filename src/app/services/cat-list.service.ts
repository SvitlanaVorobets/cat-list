import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ICat } from '../models/cat.interface';
import { IBreed } from '../models/breed.interface';

@Injectable({
  providedIn: 'root'
})
export class CatListService {

  link = `https://api.thecatapi.com/v1`
  constructor(private http: HttpClient) { }

  getAllCats(limit: number): Observable<ICat[]>{
    return this.http.get<ICat[]>(this.link + `/images/search?limit=${limit}&api_key=${environment.apiKey}`)
  }

  getAllBreeds(): Observable<IBreed[]>{
    return this.http.get<IBreed[]>(this.link + '/breeds')
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoObjetivo } from '../models/tipo-objetivo.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoObjetivoService {

    private url: Readonly<string> = "http://localhost:8080/tipo-objetivo";
    #http = inject(HttpClient);

    public getAllTiposObjetivo(): Observable<TipoObjetivo[]> {
        return this.#http.get<TipoObjetivo[]>(this.url);
      }
}

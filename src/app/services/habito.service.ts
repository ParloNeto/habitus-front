import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HabitoResponse } from '../models/habito-response.interface';
import { Habito } from '../models/habito.interface';
import { Observable } from 'rxjs';
import { HistoricoResponse } from '../models/historico-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HabitoService {

  private url: Readonly<string> = "http://localhost:8080/habitos";

  #http = inject(HttpClient);

  public getAllHabitos(): Observable<Habito[]> {
    return this.#http.get<Habito[]>(this.url);
  }

  public getHabitoById(id: string): Observable<Habito> {
    return this.#http.get<Habito>(`${this.url}/${id}`);
  }

  public patchHistoricoByHabito(id: string, dataDaAtividade: HistoricoResponse): Observable<void> {
    return this.#http.patch<void>(`${this.url}/${id}/historico`, dataDaAtividade);
  }

  public createHabito(habito: HabitoResponse): Observable<Habito> {
    return this.#http.post<Habito>(this.url, habito);
  }

  public deleteHabito(id: string): Observable<void> {
    return this.#http.delete<void>(`${this.url}/${id}`);
  }

}

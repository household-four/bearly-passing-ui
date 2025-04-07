import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDTO } from '../models/gameDto';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGameById(gameId: string): Observable<GameDTO> {
      return this.http.get<GameDTO>(`/api/game/${gameId}`);
    }
}

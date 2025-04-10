import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDTO, GameSession } from '../models/gameDto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGameById(gameId: string): Observable<GameDTO> {
    return this.http.get<GameDTO>(`/api/game/${gameId}`);
  }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>('/api/student/all');
  }

  assignUserToGame(studentId: number, gameId: number): Observable<GameSession> {
    return this.http.post<GameSession>(`api/game/game/${gameId}/student/${studentId}/session`, null);
  }

  removeUserFromGame(sessionId: number): Observable<void> {
    return this.http.delete<void>(`api/gamesession/delete/${sessionId}`);
  }
}

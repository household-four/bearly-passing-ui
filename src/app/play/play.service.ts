import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameSession } from '../models/gameDto';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) { }

  getSessionById(sessionId: string): Observable<GameSession> {
    return this.http.get<GameSession>(`/api/gamesession/${sessionId}`);
  }

  submitAnswer(answer: {
    gameSessionId: number;
    questionId: string;
    submittedAnswer: string;
  }): Observable<{message: string}> {
    return this.http.post<{message: string}>('/api/gamesession/answer', answer); 
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudySetDTO } from '../models/studySetDto';
import { Observable } from 'rxjs';
import { NewQuestion } from '../models/questionDto';

@Injectable({
  providedIn: 'root'
})
export class StudySetService {

  constructor(private http: HttpClient) { }

  getStudySetById(setId: string): Observable<StudySetDTO> {
    return this.http.get<StudySetDTO>(`/api/set/${setId}`);
  }

  postNewQuestion(newQuestion: NewQuestion ): Observable<any> {
    return this.http.post<any>(`/api/question/create`, newQuestion);
  }

  getGamesByStudySetId(setId: string): Observable<any> {
    return this.http.get<StudySetDTO>(`/api/set/games/${setId}`);
  }
}

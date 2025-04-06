import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudySetDTO } from '../models/studySetDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudySetService {

  constructor(private http: HttpClient) { }

  getStudySetById(setId: string): Observable<StudySetDTO> {
    return this.http.get<StudySetDTO>(`/api/set/${setId}`);
  }
}

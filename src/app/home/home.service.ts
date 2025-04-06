import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudySetDTO } from '../models/studySetDto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMyGameSessions(studentId: number): Observable<any[]> {
    const params = new HttpParams().set('studentId', studentId.toString());
    return this.http.get<any>('/api/student/my-games', { params });
  }

  getMyStudents(teacherId: number): Observable<any[]> {
     return this.http.get<any>(`/api/teacher/my-students/${teacherId}`);
  }

  getMyStudySets(userId: number): Observable<StudySetDTO[]> {
    return this.http.get<StudySetDTO[]>(`/api/user/my-study-sets/${userId}`);
  }
}

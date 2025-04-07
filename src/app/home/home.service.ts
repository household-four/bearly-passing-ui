import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudySetDTO } from '../models/studySetDto';
import { UserDTO } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMyGameSessions(studentId: number): Observable<any[]> {
    const params = new HttpParams().set('studentId', studentId.toString());
    return this.http.get<any>('/api/student/my-games', { params });
  }

  getMyStudents(teacherId: number): Observable<UserDTO[]> {
     return this.http.get<UserDTO[]>(`/api/teacher/my-students/${teacherId}`);
  }

  getMyStudySets(userId: number): Observable<StudySetDTO[]> {
    return this.http.get<StudySetDTO[]>(`/api/user/my-study-sets/${userId}`);
  }

  postNewStudySet(newSet: {title: string, description: string}, userId: number): Observable<any> {
    const params = new HttpParams()
    .set('name', newSet.title)
    .set('description', newSet.description)
    .set('userId', userId.toString());

    return this.http.post<any>(`/api/set/create`, null, { params });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}

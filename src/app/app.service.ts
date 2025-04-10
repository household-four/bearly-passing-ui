import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() { }

}

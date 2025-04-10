import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';
import { User } from '../models/user';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  imports: [
    BadgeModule,
    ButtonModule,
    TableModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  users: User[] = [];
  user: User | null = null;

  loading: boolean = true;

  roleDict: Record<User['role'], string> = {
    "STUDENT": "success",
    "TEACHER": "info",
    "ADMIN": "danger"
  };

  constructor(
    private appService: AppService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.getUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
    });

    this.appService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
      });
      this.appService.user$.next(null);
  }

  populate() {
    this.loginService.populate().pipe(
      switchMap(() => this.loginService.getUsers())
    ).subscribe(users => {
      this.users = users;
    });
  }

  selectUser(user: User) {
    console.log("USER", user);
    this.appService.user$.next(user);
    this.router.navigate(['/home', user.id]);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}

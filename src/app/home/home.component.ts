import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Subject, takeUntil } from 'rxjs';
import { User, UserDTO } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    BadgeModule,
    TableModule
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  destroyed$: Subject<void> = new Subject<void>();
  user!: User;
  role!: User['role'];

  // teacher things
  students: UserDTO[] = [];

  // student things


  games: any[] = [];
  gameSessions: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.loginService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (user) {

          this.loading = false;
          this.user = user;
          this.role = user.role;
          this.getUserItems();
        } else {
          this.initFromRoute();
        }
      });
  }

  initFromRoute() {
    const userId = this.route.snapshot.paramMap.get('userid');
    if (userId) {
      this.loginService.getUser(userId).subscribe(user => {
        if (user) {
          const fullUser = { ...user, name: user.username, roleName: user.role };
          this.loginService.user$.next(fullUser);
          this.loading = false;
          this.role = user.role;
          this.getUserItems();
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUserItems() {
    if (this.role === 'STUDENT') {
      this.homeService.getMyGameSessions(this.user.id).subscribe(games => {
        console.log("got student game sessions!", games);
        this.gameSessions = games;
      });

      // get my teachers

      // get my grades? classes?

      // get my study sets
    } else if (this.role === 'TEACHER') {
      
      this.homeService.getMyStudents(this.user.id).subscribe(students => {
        this.students = students;
        console.log("got students!", students);
      });

      // get my study sets


    }
  }
}

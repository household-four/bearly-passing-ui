import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Subject, takeUntil } from 'rxjs';
import { User, UserDTO } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { StudySetDTO } from '../models/studySetDto';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    TooltipModule
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private appService: AppService,
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
  teachers: UserDTO[] = [];
  // everybody things
  studySets: StudySetDTO[] = [];

  games: any[] = [];
  gameSessions: any[] = [];

  // new study set 
  creatingNew: boolean = false;
  newStudySet: {title: string, description: string} = {
    title: '',
    description: '',
  };

  loading: boolean = true;

  ngOnInit(): void {
    this.appService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        if (user) {

          this.loading = false;
          this.user = user;
          this.role = user.role;
          this.getUserItems();
        } else {
          if (this.router.url.startsWith('/home')) {
            this.initFromRoute();
          }
          //this.initFromRoute();
        }
      });
  }

  initFromRoute() {
    const userId = this.route.snapshot.paramMap.get('userid');
    if (userId) {
      this.loginService.getUser(userId).subscribe(user => {
        if (user) {
          const fullUser = { ...user, name: user.username, roleName: user.role };
          console.log("HOME COMPONENT INIT FROM ROUTE")
          this.appService.user$.next(fullUser);
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
      // get my game sessions
      this.homeService.getMyGameSessions(this.user.id).subscribe(games => {
        console.log("got student game sessions!", games);
        this.gameSessions = games;
      });

      // get my teachers
      this.homeService.getMyTeachers(this.user.id).subscribe(teachers => {
        console.log("got student's teachers!", teachers);
        this.teachers = teachers;
      });

      // get my grades? classes?

      // get my study sets

      // get my assigned games
    } else if (this.role === 'TEACHER') {
      
      this.homeService.getMyStudents(this.user.id).subscribe(students => {
        this.students = students;
        console.log("got students!", students);
      });
    }

    // default: get study sets
    this.homeService.getMyStudySets(this.user.id).subscribe(studysets => {
      this.studySets = studysets;
      console.log("got study sets!", studysets);
    });
  }

  editStudySet(set: StudySetDTO) {
    this.router.navigate(['/study-set', set.id]);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createStudySet( ) {
    this.creatingNew = true;
  }

  saveStudySet( ) {
    this.homeService.postNewStudySet(this.newStudySet, this.user.id).subscribe(studySet => {
      this.studySets.push(studySet);
      this.creatingNew = false;
      this.newStudySet = { title: '', description: '' };
    });
  }

  playGame(gameId: string) {
    this.router.navigate(['/play', gameId]);
  }
}

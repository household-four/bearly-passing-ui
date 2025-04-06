import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudySetService } from './study-set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySetDTO } from '../models/studySetDto';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../models/user';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-study',
  imports: [
    ButtonModule,
    BadgeModule,
    TableModule
  ],
  standalone: true,
  templateUrl: './study-set.component.html',
  styleUrl: './study-set.component.scss'
})
export class StudySetComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();
  canEdit: boolean = false;
  studySet?: StudySetDTO;
  user: User | null = null;
  loading: boolean = true;

  constructor(
    private loginService: LoginService,
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const setId = this.route.snapshot.paramMap.get('id');
    if (setId) {
      this.studySetService.getStudySetById(setId).subscribe(studySet => {
        this.studySet = studySet;
        this.loading = false;
        console.log("should load now")
      });
    } else {
      this.router.navigate(['/login']);
    }

    // this.loginService.user$
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe(user => {
    //     if (user) {
    //       this.user = user;
    //       this.checkPermissions();
    //     } else {
    //       this.router.navigate(['/login']);
    //     }
    //   });
  }

  checkPermissions() {
    if (this.studySet?.creator.id === this.user?.id) {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

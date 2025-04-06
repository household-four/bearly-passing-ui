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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { NewQuestion, QuestionDTO } from '../models/questionDto';

@Component({
  selector: 'app-study',
  imports: [
    ButtonModule,
    BadgeModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
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

  // new question
  // new study set 
  creatingNew: boolean = false;
  newQuestion: NewQuestion = {
    body: '',
    correctAnswer: '',
    difficulty: "EASY",
    studySet: { id: 0 }
  };
  selectedDifficulty: {label: string, value: string} = {label: "Easy", value: "EASY"};
  difficulties = [
    {label: "Easy", value: "EASY"}, 
    {label: "Medium", value: "MEDIUM"},
    {label: "Hard", value: "HARD"} 
  ]

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

  createQuestion() {
    this.creatingNew = true;
  }

  saveNewQuestion() {
    this.newQuestion.studySet.id = this.studySet?.id || 0;
    this.newQuestion.difficulty = this.selectedDifficulty.value as NewQuestion['difficulty'];

    this.studySetService.postNewQuestion(this.newQuestion).subscribe(() => { 
      this.creatingNew = false;
      this.newQuestion = {
        body: '',
        correctAnswer: '',
        difficulty: "EASY",
        studySet: { id: 0 }
      };

      this.studySetService.getStudySetById(JSON.stringify(this.studySet?.id)).subscribe(studySet => {
        this.studySet = studySet;
      });
    });
  }
}

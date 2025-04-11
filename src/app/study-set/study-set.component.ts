import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudySetService } from './study-set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySetDTO } from '../models/studySetDto';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../models/user';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableEditCompleteEvent, TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { NewQuestion, QuestionDTO } from '../models/questionDto';
import { GameDTO } from '../models/gameDto';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-study',
  imports: [
    ButtonModule,
    BadgeModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    TooltipModule
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

  // games
  games: GameDTO[] = [];

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
        this.getGames();
        this.loading = false;
      });
    } else {
      this.router.navigate(['/login']);
    }
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

  getGames() {
    this.studySetService.getGamesByStudySetId(JSON.stringify(this.studySet?.id)).subscribe(games => {
      console.log("got games", games );
      this.games = games;
    });
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

  getCompletedCount(game: GameDTO): number {
    return game.gameSessions?.filter(s => s.completed).length || 0;
  }

  getAvgScore(game: GameDTO): number {
    const total = game.gameSessions.reduce((sum, session) => sum + (session.score || 0), 0);
    return total / game.gameSessions.length;
  }

  createGame() {
    this.router.navigate(['/create-game']);
  }

  editGame(game: GameDTO) {
    this.router.navigate(['/game', game.id]);
  }

  saveQuestionEdit(event: TableEditCompleteEvent) {
    
    if (event.index) {
      const question = this.studySet?.questions.filter(q => q.id == JSON.stringify(event.index!))[0] as QuestionDTO;
      this.studySetService.patchUpdateQuestion(question.id, question).subscribe((q) => {
      });
    }
    
  }

  downloadSet(set: StudySetDTO) {
    const blob = new Blob([JSON.stringify(set)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${set.title}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

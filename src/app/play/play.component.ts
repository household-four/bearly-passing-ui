import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayService } from './play.service';
import { StudySetService } from '../study-set/study-set.service';
import { QuestionDTO } from '../models/questionDto';
import { GameSession } from '../models/gameDto';
import { CardModule } from 'primeng/card';
import { MatchingComponent } from './matching/matching.component';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from './flashcard/flashcard.component';

@Component({
  selector: 'app-play',
  imports: [
    CardModule,
    CommonModule,
    FlashcardComponent,
    MatchingComponent
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit {
  
  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private router: Router,
    private studySetService: StudySetService,
  ) {

  }

  questions: QuestionDTO[] = [];
  loading: boolean = true;
  session!: GameSession;

  // Matching mode
  
  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    if (sessionId) {
      this.playService.getSessionById(sessionId).subscribe(session => {
        this.session = session;
        this.studySetService.getStudySetById(session.studySetId.toString()).subscribe(studySet => {
          this.questions = studySet.questions;
          this.loading = false;
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

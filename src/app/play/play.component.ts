import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayService } from './play.service';
import { StudySetService } from '../study-set/study-set.service';
import { QuestionDTO } from '../models/questionDto';
import { GameSession } from '../models/gameDto';
import { CardModule } from 'primeng/card';
import { MatchingComponent } from './matching/matching.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play',
  imports: [
    CardModule,
    CommonModule,
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

  answerQuestion(questionId: string, answer: string) {
    // but if I answer a question, won't it POST the answer to anyone 
    // who sees this question?
    // How do I make each question unique to the user?
  }
}

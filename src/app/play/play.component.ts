import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayService } from './play.service';
import { StudySetService } from '../study-set/study-set.service';
import { QuestionDTO } from '../models/questionDto';

@Component({
  selector: 'app-play',
  imports: [],
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
  
  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('gameId');
    if (sessionId) {
      this.studySetService.getStudySetById(sessionId).subscribe(studySet => {
        console.log("got questions", studySet.questions)
        this.questions = studySet.questions;
        
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

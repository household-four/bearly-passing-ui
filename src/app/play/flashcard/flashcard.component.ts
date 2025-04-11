import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { QuestionDTO } from '../../models/questionDto';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GameSession } from '../../models/gameDto';
import { PlayService } from '../play.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-flashcard',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.scss'
})
export class FlashcardComponent {
  @Input() questions: QuestionDTO[] = [];
  @Input() sessionId: number = 0;

  currentIndex = 0;
  currentAnswer = '';
  feedback = '';

  constructor(private playService: PlayService) {}

  checkAnswer(): void {
    const currentQuestion = this.questions[this.currentIndex];

    const answerPayload = {
      gameSessionId: this.sessionId,
      questionId: currentQuestion.id,
      submittedAnswer: this.currentAnswer
    };
    this.playService.submitAnswer(answerPayload).subscribe({
      next: (res) => {

        if (res.message.startsWith("Correct")) {
          this.feedback = 'Correct! Moving on...';
          this.currentIndex++;
          this.currentAnswer = '';
        } else {
          this.feedback = 'Incorrect. Try again!';
        }
      },
      error: (err) => {
        console.error('Error submitting answer:', err);
      }
    });
  }
}

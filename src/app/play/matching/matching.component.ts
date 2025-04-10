import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { QuestionDTO } from '../../models/questionDto';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { GameSession } from '../../models/gameDto';
import { PlayService } from '../play.service';

interface Card {
  id: string,
  text: string,
  pairId: string,
  matched?: boolean
  type: "QUESTION" | "ANSWER"
}

@Component({
  selector: 'app-matching',
  imports: [
    CardModule,
    CommonModule
  ],
  templateUrl: './matching.component.html',
  styleUrl: './matching.component.scss'
})
export class MatchingComponent implements OnInit {
  @Input() questions: QuestionDTO[] = [];
  // @Input() session: GameSession = {} as GameSession;
  @Input() sessionId: number = 0;

  selectedCard1: Card | null = null;
  selectedCard2: Card | null = null;
  shuffledCards: Card[] = [];

  constructor(
    private playService: PlayService
  ) {}

  ngOnInit(): void {
    this.prepareMatchingCards();
  }

  ngOnChanges() {
    if (this.sessionId && this.questions.length > 0) {
      this.prepareMatchingCards();
    }
  }

  prepareMatchingCards() {
    const flatCards: Card[] = this.questions.flatMap(q => [
      { id: `${q.id}-Q`, pairId: q.id, text: q.body, type: "QUESTION" },
      { id: `${q.id}-A`, pairId: q.id, text: q.correctAnswer, type: "ANSWER" }
    ]);

    this.shuffledCards = this.shuffleArray(flatCards);
  }

  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  flipCard(card: Card) {
    if (card.matched || this.selectedCard2) return;

    if (!this.selectedCard1) {
      this.selectedCard1 = card;
    } else {
      this.selectedCard2 = card;

      const c1 = this.selectedCard1;
      const c2 = this.selectedCard2;

      if (c1.pairId === c2.pairId && c1.id !== c2.id) {
        // Match!
        c1.matched = true;
        c2.matched = true;

        const answerCard = c1.type === "ANSWER" ? c1 : c2;

        console.log("SESSION ID", this.sessionId, this.questions);
        const answerPayload = {
          gameSessionId: this.sessionId,
          questionId: c1.pairId,
          submittedAnswer: answerCard.text
        };

        this.playService.submitAnswer(answerPayload).subscribe( res =>{
          console.log('Answer submitted:', res)
        });

        this.resetSelection(300);
      } else {
        // No match
        this.resetSelection(1000);
      }
    }
  }

  resetSelection(delay: number) {
    setTimeout(() => {
      this.selectedCard1 = null;
      this.selectedCard2 = null;
    }, delay);
  }

  isSelected(card: any): boolean {
    return card.id === this.selectedCard1?.id || card.id === this.selectedCard2?.id;
  }


}

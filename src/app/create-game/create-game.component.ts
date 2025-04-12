import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-create-game',
  standalone: true,
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    SelectModule,
    ButtonModule
  ]
})
export class CreateGameComponent {
  createGameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.createGameForm = this.fb.group({
      studySetId: ['', Validators.required],
      userId: ['', Validators.required],
      gameType: ['FLASHCARD', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createGameForm.valid) {
      this.gameService.createGame(this.createGameForm.value).subscribe({
        next: (response) => {
          console.log('Game created successfully:', response);
          this.router.navigate(['/home', this.createGameForm.value.userId]);
        },
        error: (err) => {
          console.error('Game creation failed:', err);
        }
      });
    }
  }
}

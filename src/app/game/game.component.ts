import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StudySetService } from '../study-set/study-set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from './game.service';
import { GameDTO, GameSession } from '../models/gameDto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-game',
  imports: [
    ButtonModule,
    BadgeModule,
    FormsModule,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy{
  destroyed$: Subject<void> = new Subject<void>();

  game!: GameDTO;
  gameSessions: GameSession[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.getGameById(gameId).subscribe(game => {
        this.game = game;
        this.gameSessions = game.gameSessions;
        console.log("OPK GAMES GOOD", game)
      });

    } else {
      this.router.navigate(['/login']);
    }

      
  }
  
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addUser() {
    
  }
}

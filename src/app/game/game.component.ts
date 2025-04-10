import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { StudySetService } from '../study-set/study-set.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from './game.service';
import { GameDTO, GameSession } from '../models/gameDto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { User } from '../models/user';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-game',
  imports: [
    ButtonModule,
    BadgeModule,
    FormsModule,
    MultiSelectModule,
    SelectModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    TooltipModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  game!: GameDTO;
  gameSessions: GameSession[] = [];

  students: User[] = [];
  assignedStudents: User[] = [];

  addingUser: boolean = false;

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

        this.gameService.getAllStudents().subscribe(students => {
          this.students = students;

          this.gameSessions.forEach(session => {
            const foundStudent = students.find(s => s.id === session.studentId);

            if (foundStudent) {
              this.assignedStudents.push(foundStudent);
            }
          });
          console.log("assinged: ", this.assignedStudents, "all", this.students)
        });
      });

    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addUser(): void {
    this.addingUser = true;
  }

  saveAssignedUsers(): void {
    const assignedIds = this.assignedStudents.map(s => s.id);
    const currentIds = this.gameSessions.map(s => s.studentId);

    const toAdd = this.assignedStudents.filter(s => !currentIds.includes(s.id));
    const toRemove = this.gameSessions.filter(gs => !assignedIds.includes(gs.studentId));

    const addRequests = toAdd.map(student =>
      this.gameService.assignUserToGame(student.id, this.game.id)
    );

    const removeRequests = toRemove.map(session =>
      this.gameService.removeUserFromGame(session.id)
    );

    const allRequests = [...addRequests, ...removeRequests];

    if (allRequests.length === 0) {
      return; // nothing to do
    }

    forkJoin(allRequests).subscribe(() => {
      // Fetch game data again after all changes go thru
      this.gameService.getGameById(this.game.id.toString()).subscribe(game => {
        console.log("Updated game:", game);
        this.game = game;
        this.gameSessions = game.gameSessions;
      });
    });
  }

  unassignUser(session: GameSession): void {
    this.gameService.removeUserFromGame(session.id).subscribe(() => {
      this.gameSessions = this.gameSessions.filter(gs => gs.id !== session.id);
      this.assignedStudents = this.assignedStudents.filter(s => s.id !== session.studentId);
    });
  }
}

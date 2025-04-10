import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { AppService } from './app.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/user';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  imports: [
    AvatarModule,
    RouterOutlet,
    MenubarModule,
    TooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private appService: AppService,
    private router: Router
  ) { }
  title = 'bearly-passing-ui';
  items: MenuItem[] = [
    {
      icon: 'fa-solid fa-arrow-right-to-bracket',
      //routerLink: '/login',
      tooltip: 'Back to login',
      command: () => {
        this.router.navigate(['/login'], { replaceUrl: true });
        this.appService.user$.next(null);
        
      },
    }
  ]

  user: User | null = null;

  ngOnInit(): void {
    this.appService.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(user => {
        console.log("user changes", user)
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

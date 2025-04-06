import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenubarModule,
    TooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'bearly-passing-ui';
  items: MenuItem[] = [
    {
      icon: 'fa-solid fa-arrow-right-to-bracket',
      routerLink: '/login',
      tooltip: 'Back to login',
    }
  ]
}

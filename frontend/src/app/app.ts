import { Component } from '@angular/core';
import { ContactsDashboardComponent } from './features/contacts/pages/contacts-dashboard/contacts-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactsDashboardComponent],
  template: `<app-contacts-dashboard></app-contacts-dashboard>`,
  styleUrl: './app.scss'
})
export class App {}

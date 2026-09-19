import { Component } from '@angular/core';
import { ContactsDashboardComponent } from './features/contacts/pages/contacts-dashboard/contacts-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactsDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

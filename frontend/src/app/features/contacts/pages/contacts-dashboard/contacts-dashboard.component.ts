import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { ContactDetailsComponent } from '../../components/contact-details/contact-details.component';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    ContactDetailsComponent
  ],
  templateUrl: './contacts-dashboard.component.html',
  styleUrl: './contacts-dashboard.component.scss'
})
export class ContactsDashboardComponent {
  protected readonly contactsService = inject(ContactsService);
  readonly isMobileDetailOpen = signal<boolean>(false);

  constructor() {
    // When selectedContact changes on mobile, automatically show details
    effect(() => {
      const selected = this.contactsService.selectedContact();
      if (selected && typeof window !== 'undefined' && window.innerWidth < 1024) {
        this.isMobileDetailOpen.set(true);
      }
    });
  }

  onBackToList(): void {
    this.isMobileDetailOpen.set(false);
  }
}

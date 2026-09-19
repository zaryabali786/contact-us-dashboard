import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { ContactDetailsComponent } from '../../components/contact-details/contact-details.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';

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
  readonly isSidebarCollapsed = signal<boolean>(false);

  onContactSelected(contact: Contact): void {
    // When viewport is in mobile single-pane mode, navigate to detail view
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      this.isMobileDetailOpen.set(true);
    }
  }

  onBackToList(): void {
    this.isMobileDetailOpen.set(false);
  }

  onToggleSidebar(): void {
    this.isSidebarCollapsed.update(v => !v);
  }
}

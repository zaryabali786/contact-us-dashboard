import { Component, OnInit, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ImageFallbackDirective } from '../../../../shared/directives/image-fallback.directive';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    SkeletonComponent,
    ImageFallbackDirective
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  protected readonly contactsService = inject(ContactsService);
  readonly contactSelected = output<Contact>();
  readonly menuClicked = output<void>();

  searchInputValue = '';

  toggleMenu(): void {
    this.menuClicked.emit();
  }

  ngOnInit(): void {
    // Initial fetch from GET /contacts via ContactsService
    this.contactsService.loadContacts().subscribe();
  }

  onSearchChange(val: string): void {
    this.searchInputValue = val;
    this.contactsService.setSearchQuery(val);
  }

  clearSearch(): void {
    this.searchInputValue = '';
    this.contactsService.setSearchQuery('');
  }

  selectContact(contact: Contact): void {
    this.contactsService.selectContact(contact.id);
    this.contactSelected.emit(contact);
  }

  onPrev(): void {
    const list = this.contactsService.contacts();
    const currentId = this.contactsService.selectedContactId();
    if (!list.length) return;
    const currentIndex = list.findIndex(c => c.id === currentId);
    if (currentIndex > 0) {
      this.contactsService.selectContact(list[currentIndex - 1].id);
    } else {
      this.contactsService.selectContact(list[list.length - 1].id);
    }
  }

  onNext(): void {
    const list = this.contactsService.contacts();
    const currentId = this.contactsService.selectedContactId();
    if (!list.length) return;
    const currentIndex = list.findIndex(c => c.id === currentId);
    if (currentIndex < list.length - 1 && currentIndex !== -1) {
      this.contactsService.selectContact(list[currentIndex + 1].id);
    } else {
      this.contactsService.selectContact(list[0].id);
    }
  }

  onRowAction(type: 'chat' | 'phone' | 'more', contact: Contact, event: Event): void {
    event.stopPropagation();
    this.selectContact(contact);

    if (type === 'chat') {
      const email = contact.dial || `${contact.first_name.toLowerCase()}.${contact.last_name.toLowerCase()}@example.com`;
      if (typeof window !== 'undefined') {
        window.open(`mailto:${email}`, '_blank');
      }
    } else if (type === 'phone' && contact.phone) {
      if (typeof window !== 'undefined') {
        window.open(`tel:${contact.phone}`, '_self');
      }
    }
  }
}

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

  readonly chatUnselectedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAt0lEQVR4AcyP3Q3CMAyELwkDdASYANigDAKCPahkBAOwQRWVPWAT2IOi4FgkCg/9CU9YudZ1/V1sTafLnY6NGyWqF0hCw7lp8t2fGhRIQid5dpoNEzWlrMjrZsNxPF73d5hd/gO2PMmqU7pdUrW78f94wtiWqvUWrxadeqIgqktlMA+0h62AvmImVwzIAWd8QkfQF5R7+NdY+ZtjL+03MzZTfeLmA0vOFyyVgQcbE7eIQTbMIILBGwAA//8k8pzcAAAABklEQVQDAPTvY0VVvvB4AAAAAElFTkSuQmCC';
  readonly chatSelectedIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAvklEQVR4AcyQMQ7CMAxF43Rg7RHKCQAJmOEQSLCxICFxCbgBAz1Ap3ILmIE7lIOgGBtiYYaWRCyN8hMn8XNs283iVpEwRKvZpW/UsGRnpKDZSSDVjgzrc5QdDa/n14kvsYqGVWrZP7BpBewKQJzWCcENDsfRWdUsabsiL8fLB73UyTlIudPWQo/cXpNqfoN8SgBOvwRo9sYPyz96m7c7L6Ginz+ueTnskqBJ1JOdEF+wXDbt1LStBIiGObAEeAIAAP//DrrszgAAAAZJREFUAwBjVHAuB63B1gAAAABJRU5ErkJggg==';

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

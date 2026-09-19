import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Contact } from '../../../core/models/contact.model';
import { EmailAddress } from '../../../core/models/email.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly apiService = inject(ApiService);

  // Reactive State Signals
  readonly contacts = signal<Contact[]>([]);
  readonly selectedContactId = signal<string | null>(null);
  readonly selectedContactEmails = signal<EmailAddress[]>([]);
  readonly searchQuery = signal<string>('');
  readonly isLoadingContacts = signal<boolean>(false);
  readonly isLoadingEmails = signal<boolean>(false);
  readonly contactsError = signal<string | null>(null);
  readonly emailsError = signal<string | null>(null);

  // Computed active contact object
  readonly selectedContact = computed<Contact | null>(() => {
    const id = this.selectedContactId();
    if (!id) return this.contacts()[0] || null;
    return this.contacts().find(c => c.id === id) || this.contacts()[0] || null;
  });

  /**
   * Load complete contact list from GET /contacts with optional search query
   */
  loadContacts(query?: string): Observable<Contact[]> {
    this.isLoadingContacts.set(true);
    this.contactsError.set(null);

    const params: Record<string, string> = {};
    if (query && query.trim()) {
      params['q'] = query.trim();
    }

    return this.apiService.get<Contact[]>('contacts', params).pipe(
      tap({
        next: (contactList) => {
          this.contacts.set(contactList);
          this.isLoadingContacts.set(false);

          // If no active selection or selected contact is no longer in list, default to first contact
          const currentSelected = this.selectedContactId();
          if (!currentSelected && contactList.length > 0) {
            this.selectContact(contactList[0].id);
          } else if (currentSelected && !contactList.some(c => c.id === currentSelected)) {
            if (contactList.length > 0) {
              this.selectContact(contactList[0].id);
            } else {
              this.selectedContactId.set(null);
              this.selectedContactEmails.set([]);
            }
          }
        },
        error: (err) => {
          this.contactsError.set(err.message || 'Failed to load contacts');
          this.isLoadingContacts.set(false);
        }
      })
    );
  }

  /**
   * Select a contact by ID and fetch their email addresses from GET /contacts/{id}/email_addresses
   */
  selectContact(contactId: string | number): void {
    const id = String(contactId);
    this.selectedContactId.set(id);
    this.loadEmailAddresses(id).subscribe();
  }

  /**
   * Load email addresses for a specific contact from GET /contacts/{id}/email_addresses
   */
  loadEmailAddresses(contactId: string | number): Observable<EmailAddress[]> {
    this.isLoadingEmails.set(true);
    this.emailsError.set(null);

    return this.apiService.get<EmailAddress[]>(`contacts/${contactId}/email_addresses`).pipe(
      tap({
        next: (emails) => {
          this.selectedContactEmails.set(emails);
          this.isLoadingEmails.set(false);
        },
        error: (err) => {
          this.emailsError.set(err.message || 'Failed to load email addresses');
          this.selectedContactEmails.set([]);
          this.isLoadingEmails.set(false);
        }
      })
    );
  }

  /**
   * Set search query and trigger contact filtering
   */
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.loadContacts(query).subscribe();
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contact } from '../models/contact.model';
import { EmailAddress } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  /**
   * Fetch all contacts from GET /contacts with optional search query
   */
  getContacts(searchQuery?: string): Observable<Contact[]> {
    let params = new HttpParams();
    if (searchQuery && searchQuery.trim()) {
      params = params.set('q', searchQuery.trim());
    }
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`, { params });
  }

  /**
   * Fetch email addresses for a specific contact from GET /contacts/{id}/email_addresses
   */
  getEmailAddresses(contactId: string | number): Observable<EmailAddress[]> {
    return this.http.get<EmailAddress[]>(`${this.baseUrl}/contacts/${contactId}/email_addresses`);
  }

  /**
   * Fetch a single contact profile from GET /contacts/{id}
   */
  getContactById(contactId: string | number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${contactId}`);
  }
}

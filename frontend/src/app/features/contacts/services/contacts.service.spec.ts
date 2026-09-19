import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactsService } from './contacts.service';
import { ApiService } from '../../../core/services/api.service';
import { Contact } from '../../../core/models/contact.model';
import { EmailAddress } from '../../../core/models/email.model';
import { environment } from '../../../../environments/environment';

describe('ContactsService Integration & State Management', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  const mockContacts: Contact[] = [
    {
      id: '1',
      first_name: 'Johanna',
      last_name: 'Stevens',
      name: 'Johanna Stevens',
      company: 'WhiteUI Studio',
      job_title: 'UI/UX Designer',
      phone: '439-582-1578',
      address: '742 Evergreen Terrace',
      avatar: 'https://example.com/avatar1.jpg',
      status: 'online',
      bio: 'Bio text'
    },
    {
      id: '2',
      first_name: 'Nicholas',
      last_name: 'Gordon',
      name: 'Nicholas Gordon',
      company: 'TechCorp',
      job_title: 'Developer',
      phone: '555-234-8901',
      address: 'Austin, TX',
      avatar: '',
      status: 'online',
      bio: 'Developer bio'
    }
  ];

  const mockEmailsContact1: EmailAddress[] = [
    { id: 'e-1', contact_id: '1', email: 'johanna.stevens@gmail.com', is_primary: true },
    { id: 'e-2', contact_id: '1', email: 'johanna.stevens@whiteui.store', is_primary: false }
  ];

  const mockEmailsContact2: EmailAddress[] = [
    { id: 'e-3', contact_id: '2', email: 'nicholas.gordon@techcorp.io', is_primary: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService,
        ContactsService
      ]
    });

    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('1. should call GET /contacts on loadContacts() and populate contacts state', () => {
    service.loadContacts().subscribe((contacts) => {
      expect(contacts.length).toBe(2);
      expect(contacts[0].first_name).toBe('Johanna');
    });

    const req = httpMock.expectOne(`${baseUrl}/contacts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContacts);

    // Initial load also auto-selects first contact and triggers email fetch
    const emailReq = httpMock.expectOne(`${baseUrl}/contacts/1/email_addresses`);
    expect(emailReq.request.method).toBe('GET');
    emailReq.flush(mockEmailsContact1);

    expect(service.contacts().length).toBe(2);
    expect(service.selectedContactId()).toBe('1');
    expect(service.selectedContactEmails().length).toBe(2);
    expect(service.selectedContact()?.first_name).toBe('Johanna');
  });

  it('2. changing the selected contact actually triggers the correct email-address API request', () => {
    // Initial setup: select contact 1
    service.selectContact('1');
    const req1 = httpMock.expectOne(`${baseUrl}/contacts/1/email_addresses`);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockEmailsContact1);

    expect(service.selectedContactId()).toBe('1');
    expect(service.selectedContactEmails()[0].email).toBe('johanna.stevens@gmail.com');

    // Action: Change selected contact to ID 2
    service.selectContact('2');

    // Verification: A new request for contact 2's email addresses is triggered
    const req2 = httpMock.expectOne(`${baseUrl}/contacts/2/email_addresses`);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockEmailsContact2);

    expect(service.selectedContactId()).toBe('2');
    expect(service.selectedContactEmails().length).toBe(1);
    expect(service.selectedContactEmails()[0].email).toBe('nicholas.gordon@techcorp.io');
  });

  it('3. should handle contact with zero email addresses gracefully', () => {
    service.selectContact('1');
    const req = httpMock.expectOne(`${baseUrl}/contacts/1/email_addresses`);
    req.flush([]); // Empty email array returned

    expect(service.selectedContactEmails()).toEqual([]);
    expect(service.isLoadingEmails()).toBeFalse();
    expect(service.emailsError()).toBeNull();
  });

  it('4. should handle empty contacts list (zero contacts)', () => {
    service.loadContacts().subscribe((contacts) => {
      expect(contacts.length).toBe(0);
    });

    const req = httpMock.expectOne(`${baseUrl}/contacts`);
    req.flush([]); // Zero contacts

    expect(service.contacts().length).toBe(0);
    expect(service.selectedContactId()).toBeNull();
    expect(service.selectedContact()).toBeNull();
  });

  it('5. should set error state when email address API fails', () => {
    service.selectContact('999');
    const req = httpMock.expectOne(`${baseUrl}/contacts/999/email_addresses`);
    req.flush(
      { error: 'Not Found', message: "Contact with id '999' not found.", status_code: 404 },
      { status: 404, statusText: 'Not Found' }
    );

    expect(service.isLoadingEmails()).toBeFalse();
    expect(service.emailsError()).toContain("Contact with id '999' not found");
    expect(service.selectedContactEmails()).toEqual([]);
  });
});

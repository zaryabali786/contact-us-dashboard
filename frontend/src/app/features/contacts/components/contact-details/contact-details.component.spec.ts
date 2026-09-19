import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';
import { EmailAddress } from '../../../../core/models/email.model';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let contactsService: ContactsService;

  const mockContact: Contact = {
    id: '1',
    first_name: 'Johanna',
    last_name: 'Stevens',
    name: 'Johanna Stevens',
    company: 'WhiteUI Studio',
    job_title: 'UI/UX Designer',
    phone: '439-582-1578',
    address: '742 Evergreen Terrace',
    avatar: 'https://example.com/avatar.jpg',
    status: 'online',
    bio: 'Test bio description'
  };

  const mockEmails: EmailAddress[] = [
    { id: 'e-1', contact_id: '1', email: 'johanna.stevens@gmail.com', is_primary: true },
    { id: 'e-2', contact_id: '1', email: 'johanna.stevens@whiteui.store', is_primary: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.inject(ContactsService);
  });

  it('should create the contact details component', () => {
    expect(component).toBeTruthy();
  });

  it('should render selected contact profile information', () => {
    contactsService.contacts.set([mockContact]);
    contactsService.selectedContactId.set('1');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-name')?.textContent).toContain('Johanna Stevens');
    expect(compiled.querySelector('.profile-role')?.textContent).toContain('UI/UX Designer');
    expect(compiled.querySelector('.bio-text')?.textContent).toContain('Test bio description');
  });

  it('should render email addresses dynamically retrieved from service', () => {
    contactsService.contacts.set([mockContact]);
    contactsService.selectedContactId.set('1');
    contactsService.selectedContactEmails.set(mockEmails);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailLinks = compiled.querySelectorAll('.email-link');
    expect(emailLinks.length).toBe(2);
    expect(emailLinks[0].textContent).toContain('johanna.stevens@gmail.com');
    expect(emailLinks[1].textContent).toContain('johanna.stevens@whiteui.store');

    // Verify Primary pill badge
    const primaryBadge = compiled.querySelector('.pill-badge');
    expect(primaryBadge?.textContent).toContain('Primary');
  });
});

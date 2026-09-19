import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';
import { EmailAddress } from '../../../../core/models/email.model';

describe('ContactDetailsComponent Behavior & States', () => {
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
    bio: 'When I first got into advertising, I was looking for the magical combination.',
    dial: 'j.stevens@ymsg.com',
    meeting_url: 'http://go.betacall.com/meet/j.stevens',
    phone_numbers: [
      { number: '439-582-1578', is_primary: true },
      { number: '621-770-7689', is_primary: false }
    ],
    social_links: {
      facebook: 'https://facebook.com/johanna',
      twitter: 'https://twitter.com/johanna'
    }
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

  describe('1. Contact Details Display', () => {
    it('should render selected contact profile header and information correctly', () => {
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.profile-name')?.textContent).toContain('Johanna Stevens');
      expect(compiled.querySelector('.profile-role')?.textContent).toContain('UI/UX Designer');
      expect(compiled.querySelector('.bio-text')?.textContent).toContain('When I first got into advertising');

      // Dial & Meeting links
      expect(compiled.textContent).toContain('j.stevens@ymsg.com');
      expect(compiled.textContent).toContain('http://go.betacall.com/meet/j.stevens');

      // Phone numbers
      const phoneEntries = compiled.querySelectorAll('.phone-entry');
      expect(phoneEntries.length).toBe(2);

      // Social buttons
      const socialBtns = compiled.querySelectorAll('.social-btn');
      expect(socialBtns.length).toBe(5);
    });
  });

  describe('2. Email Addresses Rendering', () => {
    it('should render all email addresses and Primary badge for the selected contact', () => {
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      contactsService.selectedContactEmails.set(mockEmails);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emailLinks = compiled.querySelectorAll('.email-link');
      expect(emailLinks.length).toBe(2);
      expect(emailLinks[0].textContent).toContain('johanna.stevens@gmail.com');
      expect(emailLinks[1].textContent).toContain('johanna.stevens@whiteui.store');

      // Verify Primary badge exists on the first email
      const primaryBadges = compiled.querySelectorAll('.email-entry .pill-badge');
      expect(primaryBadges.length).toBe(1);
      expect(primaryBadges[0].textContent).toContain('Primary');
    });
  });

  describe('3. Loading State', () => {
    it('should render skeleton shimmer loading UI when isLoadingEmails is true', () => {
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      contactsService.isLoadingEmails.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.skeleton-email-group')).toBeTruthy();
      expect(compiled.querySelector('.email-list')).toBeFalsy();
    });
  });

  describe('4. Error State', () => {
    it('should render error message when emailsError is present', () => {
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      contactsService.isLoadingEmails.set(false);
      contactsService.emailsError.set('Unable to retrieve email addresses from backend');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorElem = compiled.querySelector('.text-error');
      expect(errorElem).toBeTruthy();
      expect(errorElem?.textContent).toContain('Unable to retrieve email addresses from backend');
    });
  });

  describe('5. Empty States', () => {
    it('should render "No Contact Selected" placeholder when no contact is selected', () => {
      contactsService.contacts.set([]);
      contactsService.selectedContactId.set(null);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const noSelectionCard = compiled.querySelector('.no-selection-card');
      expect(noSelectionCard).toBeTruthy();
      expect(compiled.querySelector('h3')?.textContent).toContain('No Contact Selected');
    });

    it('should render "No email addresses found" message when contact has zero emails', () => {
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      contactsService.isLoadingEmails.set(false);
      contactsService.selectedContactEmails.set([]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyElem = compiled.querySelector('.text-empty');
      expect(emptyElem).toBeTruthy();
      expect(emptyElem?.textContent).toContain('No email addresses found');
    });
  });

  describe('6. Interactive Actions', () => {
    it('should emit back output when back button is clicked', () => {
      const backSpy = jasmine.createSpy('back');
      component.back.subscribe(backSpy);

      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      fixture.detectChanges();

      const backBtn = fixture.nativeElement.querySelector('.btn-back') as HTMLButtonElement;
      expect(backBtn).toBeTruthy();
      backBtn.click();

      expect(backSpy).toHaveBeenCalled();
    });

    it('should trigger onMessage and call window.open with primary email', () => {
      spyOn(window, 'open');
      contactsService.contacts.set([mockContact]);
      contactsService.selectedContactId.set('1');
      contactsService.selectedContactEmails.set(mockEmails);

      component.onMessage();
      expect(window.open).toHaveBeenCalledWith('mailto:johanna.stevens@gmail.com', '_blank');
    });
  });
});

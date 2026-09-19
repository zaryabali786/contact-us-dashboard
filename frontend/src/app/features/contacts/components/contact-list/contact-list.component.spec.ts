import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ContactListComponent } from './contact-list.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';

describe('ContactListComponent Behavior & States', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactsService: ContactsService;

  const mockContacts: Contact[] = [
    {
      id: '1',
      first_name: 'Johanna',
      last_name: 'Stevens',
      name: 'Johanna Stevens',
      company: 'WhiteUI Studio',
      job_title: 'UI/UX Designer',
      list_role: 'Project Manager',
      phone: '439-582-1578',
      address: 'Springfield, OR',
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
      list_role: 'Developer',
      phone: '555-234-8901',
      address: 'Austin, TX',
      avatar: 'https://example.com/avatar2.jpg',
      status: 'away',
      bio: 'Bio text 2'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactsService
      ]
    }).compileComponents();

    contactsService = TestBed.inject(ContactsService);
    spyOn(contactsService, 'loadContacts').and.returnValue(of(mockContacts));

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
  });

  it('should create the contact list component', () => {
    expect(component).toBeTruthy();
  });

  describe('1. Contact List Rendering', () => {
    it('should render contact items with avatar, status, name, and role', () => {
      contactsService.contacts.set(mockContacts);
      contactsService.isLoadingContacts.set(false);
      contactsService.selectedContactId.set('1');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.contact-item');
      expect(items.length).toBe(2);

      const firstItem = items[0];
      expect(firstItem.querySelector('.contact-name')?.textContent).toContain('Johanna Stevens');
      expect(firstItem.querySelector('.contact-role')?.textContent).toContain('Project Manager');
      expect(firstItem.classList.contains('selected')).toBeTrue();
      expect(firstItem.querySelector('.status-dot')?.classList.contains('online')).toBeTrue();

      // Quick action buttons
      const actionBtns = firstItem.querySelectorAll('.action-btn');
      expect(actionBtns.length).toBe(3); // Chat, Phone, More
    });

    it('should invoke loadContacts on ngOnInit to request /contacts', () => {
      component.ngOnInit();
      expect(contactsService.loadContacts).toHaveBeenCalled();
    });
  });

  describe('2. Contact Selection Behavior', () => {
    it('should select contact on row click and emit contactSelected output', () => {
      spyOn(contactsService, 'selectContact');
      const selectedSpy = jasmine.createSpy('contactSelected');
      component.contactSelected.subscribe(selectedSpy);

      contactsService.contacts.set(mockContacts);
      contactsService.isLoadingContacts.set(false);
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.contact-item');
      items[1].click(); // Click second contact

      expect(contactsService.selectContact).toHaveBeenCalledWith('2');
      expect(selectedSpy).toHaveBeenCalledWith(mockContacts[1]);
    });

    it('should select contact on Enter keyboard navigation', () => {
      spyOn(contactsService, 'selectContact');
      contactsService.contacts.set(mockContacts);
      contactsService.isLoadingContacts.set(false);
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.contact-item') as HTMLElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      item.dispatchEvent(enterEvent);

      expect(contactsService.selectContact).toHaveBeenCalledWith('1');
    });

    it('should cycle through contacts using next and previous buttons', () => {
      spyOn(contactsService, 'selectContact');
      contactsService.contacts.set(mockContacts);
      contactsService.selectedContactId.set('1');

      component.onNext();
      expect(contactsService.selectContact).toHaveBeenCalledWith('2');

      component.onPrev();
      expect(contactsService.selectContact).toHaveBeenCalledWith('2'); // loops to last
    });
  });

  describe('3. Loading State', () => {
    it('should render skeleton shimmer loaders when isLoadingContacts is true', () => {
      contactsService.isLoadingContacts.set(true);
      contactsService.contacts.set([]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.skeleton-list')).toBeTruthy();
      const skeletonRows = compiled.querySelectorAll('.skeleton-row');
      expect(skeletonRows.length).toBeGreaterThanOrEqual(5);

      // Contact items and empty state should not be visible
      expect(compiled.querySelector('.contact-list')).toBeFalsy();
      expect(compiled.querySelector('.empty-container')).toBeFalsy();
    });
  });

  describe('4. Error State', () => {
    it('should render error container with error message and retry button when contactsError is set', () => {
      contactsService.isLoadingContacts.set(false);
      contactsService.contacts.set([]);
      contactsService.contactsError.set('Failed to connect to Flask REST API');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorContainer = compiled.querySelector('.error-container');
      expect(errorContainer).toBeTruthy();
      expect(compiled.querySelector('.error-message')?.textContent).toContain('Failed to connect to Flask REST API');

      // Clicking retry button should re-trigger loadContacts()
      const retryBtn = compiled.querySelector('.btn-retry') as HTMLButtonElement;
      expect(retryBtn).toBeTruthy();
      retryBtn.click();
      expect(contactsService.loadContacts).toHaveBeenCalled();
    });
  });

  describe('5. Empty State', () => {
    it('should render empty state when contacts list is empty and no search query exists', () => {
      contactsService.isLoadingContacts.set(false);
      contactsService.contacts.set([]);
      contactsService.contactsError.set(null);
      component.searchInputValue = '';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyContainer = compiled.querySelector('.empty-container');
      expect(emptyContainer).toBeTruthy();
      expect(compiled.querySelector('.empty-title')?.textContent).toContain('No contacts found');
      expect(compiled.querySelector('.empty-subtitle')?.textContent).toContain('There are no contacts available');
    });

    it('should render search empty state with clear search button when search yields 0 results', () => {
      contactsService.isLoadingContacts.set(false);
      contactsService.contacts.set([]);
      contactsService.contactsError.set(null);
      component.searchInputValue = 'NonExistentName';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.empty-subtitle')?.textContent).toContain('No results matching "NonExistentName"');

      const clearBtn = compiled.querySelector('.btn-reset-search') as HTMLButtonElement;
      expect(clearBtn).toBeTruthy();

      spyOn(contactsService, 'setSearchQuery');
      clearBtn.click();
      expect(component.searchInputValue).toBe('');
      expect(contactsService.setSearchQuery).toHaveBeenCalledWith('');
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ContactListComponent } from './contact-list.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';

describe('ContactListComponent', () => {
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
      phone: '555-234-8901',
      address: 'Austin, TX',
      avatar: 'https://example.com/avatar2.jpg',
      status: 'online',
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

  it('should render contact items when loaded', () => {
    contactsService.contacts.set(mockContacts);
    contactsService.isLoadingContacts.set(false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.contact-item');
    expect(items.length).toBe(2);
    expect(compiled.querySelector('.contact-name')?.textContent).toContain('Johanna Stevens');
  });

  it('should trigger selectContact when row is clicked', () => {
    spyOn(contactsService, 'selectContact');
    contactsService.contacts.set(mockContacts);
    contactsService.isLoadingContacts.set(false);
    fixture.detectChanges();

    const item = fixture.nativeElement.querySelector('.contact-item') as HTMLElement;
    item.click();

    expect(contactsService.selectContact).toHaveBeenCalledWith('1');
  });
});

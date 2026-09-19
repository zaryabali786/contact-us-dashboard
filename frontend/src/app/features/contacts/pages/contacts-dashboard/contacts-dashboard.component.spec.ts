import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactsDashboardComponent } from './contacts-dashboard.component';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../../../core/models/contact.model';

describe('ContactsDashboardComponent Layout & Navigation', () => {
  let component: ContactsDashboardComponent;
  let fixture: ComponentFixture<ContactsDashboardComponent>;

  const mockContact: Contact = {
    id: '1',
    first_name: 'Johanna',
    last_name: 'Stevens',
    name: 'Johanna Stevens',
    company: 'WhiteUI Studio',
    job_title: 'UI/UX Designer',
    phone: '439-582-1578',
    address: 'Springfield, OR',
    avatar: 'https://example.com/avatar.jpg',
    status: 'online',
    bio: 'Test bio'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsDashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render both the master contact list pane and detail pane in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pane-list')).toBeTruthy();
    expect(compiled.querySelector('.pane-detail')).toBeTruthy();
  });

  it('should toggle sidebar collapsed state when onToggleSidebar is called', () => {
    expect(component.isSidebarCollapsed()).toBeFalse();
    component.onToggleSidebar();
    expect(component.isSidebarCollapsed()).toBeTrue();
    component.onToggleSidebar();
    expect(component.isSidebarCollapsed()).toBeFalse();
  });

  it('should close mobile detail view on onBackToList()', () => {
    component.isMobileDetailOpen.set(true);
    expect(component.isMobileDetailOpen()).toBeTrue();

    component.onBackToList();
    expect(component.isMobileDetailOpen()).toBeFalse();
  });

  it('should open mobile detail view on onContactSelected() on narrow screens', () => {
    // Spy on innerWidth
    spyOnProperty(window, 'innerWidth').and.returnValue(375);
    component.isMobileDetailOpen.set(false);

    component.onContactSelected(mockContact);
    expect(component.isMobileDetailOpen()).toBeTrue();
  });
});

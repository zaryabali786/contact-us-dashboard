import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactsDashboardComponent } from './contacts-dashboard.component';
import { ContactsService } from '../../services/contacts.service';

describe('ContactsDashboardComponent', () => {
  let component: ContactsDashboardComponent;
  let fixture: ComponentFixture<ContactsDashboardComponent>;

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

  it('should toggle mobile detail view', () => {
    component.isMobileDetailOpen.set(true);
    expect(component.isMobileDetailOpen()).toBeTrue();
    component.onBackToList();
    expect(component.isMobileDetailOpen()).toBeFalse();
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApiService
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request to /contacts using environment base URL', () => {
    const mockResponse = [{ id: '1', name: 'Johanna Stevens' }];

    service.get<any[]>('contacts').subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/contacts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should attach query parameters correctly when provided', () => {
    service.get<any[]>('contacts', { q: 'Johanna' }).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/contacts?q=Johanna`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('Johanna');
    req.flush([]);
  });

  it('should perform GET request to /contacts/:id/email_addresses correctly', () => {
    const mockEmails = [{ id: '1', email: 'johanna@example.com' }];

    service.get<any[]>('contacts/1/email_addresses').subscribe((data) => {
      expect(data).toEqual(mockEmails);
    });

    const req = httpMock.expectOne(`${baseUrl}/contacts/1/email_addresses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmails);
  });
});

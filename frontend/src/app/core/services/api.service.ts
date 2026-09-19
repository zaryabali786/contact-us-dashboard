import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  /**
   * Generic GET request with base URL and error handling
   */
  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Observable<T> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const val = params[key];
        if (val !== undefined && val !== null && val !== '') {
          httpParams = httpParams.set(key, val.toString());
        }
      });
    }

    return this.http.get<T>(url, { params: httpParams }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = error.error.message;
    } else if (error.error && typeof error.error === 'object' && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Server returned code ${error.status}: ${error.statusText || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

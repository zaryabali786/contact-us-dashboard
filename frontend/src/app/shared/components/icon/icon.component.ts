import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="app-icon"
      [style.color]="color()"
    >
      @switch (name()) {
        @case ('menu') {
          <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        }
        @case ('chevron-left') {
          <path d="M14 16L10 12L14 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        }
        @case ('chevron-right') {
          <path d="M10 16L14 12L10 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
          <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        }
        @case ('chat') {
          <path d="M2 3.5C2 2.12 3.12 1 4.5 1H15.5C16.88 1 18 2.12 18 3.5V12.5C18 13.88 16.88 15 15.5 15H4.5C3.12 15 2 13.88 2 12.5V3.5Z" fill="currentColor"/>
          <path d="M20 5C21.1 5 22 5.9 22 7V19C22 20.1 21.1 21 20 21H6C4.9 21 4 20.1 4 19H19V7C19.45 7 20 6.1 20 5Z" fill="currentColor"/>
        }
        @case ('phone') {
          <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
        }
        @case ('meeting') {
          <rect x="3" y="4" width="18" height="17" rx="3" stroke="currentColor" stroke-width="1.8"/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="1.8"/>
          <line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="16" y1="2" x2="16" y2="5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <rect x="7" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
          <rect x="11" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
          <rect x="15" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
          <rect x="7" y="15" width="2" height="2" rx="0.5" fill="currentColor"/>
          <rect x="11" y="15" width="2" height="2" rx="0.5" fill="currentColor"/>
        }
        @case ('more') {
          <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
        }
        @case ('close') {
          <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        }
        @case ('facebook') {
          <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="currentColor"/>
        }
        @case ('pinterest') {
          <path d="M12 2C6.48 2 2 6.48 2 12C2 16.24 4.65 19.86 8.42 21.27C8.33 20.48 8.25 19.26 8.45 18.41C8.63 17.64 9.61 13.47 9.61 13.47C9.61 13.47 9.32 12.89 9.32 12.03C9.32 10.69 10.1 9.69 11.07 9.69C11.89 9.69 12.29 10.31 12.29 11.05C12.29 11.88 11.76 13.12 11.49 14.27C11.26 15.23 11.97 16.01 12.92 16.01C14.64 16.01 15.96 14.19 15.96 11.57C15.96 9.28 14.31 7.68 11.96 7.68C9.25 7.68 7.67 9.71 7.67 11.88C7.67 12.7 7.99 13.58 8.39 14.07C8.47 14.17 8.48 14.26 8.46 14.35C8.39 14.64 8.24 15.26 8.21 15.39C8.17 15.56 8.06 15.61 7.89 15.53C6.77 15.01 6.07 13.37 6.07 11.84C6.07 8.78 8.29 6 12.24 6C15.42 6 17.88 8.27 17.88 11.45C17.88 14.61 15.89 17.15 13.12 17.15C12.18 17.15 11.3 16.66 11 16.09L10.42 18.3C10.2 19.14 9.61 20.19 9.18 20.87C10.08 21.15 11.02 21.3 12 21.3C17.52 21.3 22 16.82 22 11.3C22 5.78 17.52 2 12 2Z" fill="currentColor"/>
        }
        @case ('twitter') {
          <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" fill="currentColor"/>
        }
        @case ('linkedin') {
          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" fill="currentColor"/>
          <rect x="2" y="9" width="4" height="12" fill="currentColor"/>
          <circle cx="4" cy="4" r="2" fill="currentColor"/>
        }
        @case ('google') {
          <path d="M12 5C13.9 5 15.5 5.7 16.7 6.8L19.3 4.2C17.4 2.4 14.9 1.3 12 1.3C7.5 1.3 3.7 3.9 1.9 7.6L5 10C5.9 7.1 8.7 5 12 5Z" fill="currentColor"/>
          <path d="M22.7 12.3C22.7 11.5 22.6 10.7 22.5 10H12V14.5H18C17.7 16.1 16.8 17.4 15.4 18.3L18.4 20.7C20.2 19 22.7 16 22.7 12.3Z" fill="currentColor"/>
          <path d="M5 14C4.8 13.4 4.7 12.7 4.7 12C4.7 11.3 4.8 10.6 5 10L1.9 7.6C1.2 9 0.7 10.5 0.7 12C0.7 13.5 1.2 15 1.9 16.4L5 14Z" fill="currentColor"/>
          <path d="M12 22.7C15 22.7 17.5 21.7 19.4 20L16.4 17.6C15.3 18.3 13.8 18.8 12 18.8C8.7 18.8 5.9 16.7 5 13.8L1.9 16.2C3.7 19.9 7.5 22.7 12 22.7Z" fill="currentColor"/>
        }
      }
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
    .app-icon {
      display: inline-block;
      vertical-align: middle;
      transition: color 0.15s ease, transform 0.15s ease;
    }
  `]
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<number>(18);
  readonly color = input<string>('currentColor');
}

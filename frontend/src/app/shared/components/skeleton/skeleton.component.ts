import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton-loader"
      [style.width]="width()"
      [style.height]="height()"
      [style.border-radius]="radius()"
    ></div>
  `,
  styles: [`
    .skeleton-loader {
      background: linear-gradient(90deg, #f0f2f7 25%, #e6e8f0 50%, #f0f2f7 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      display: inline-block;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class SkeletonComponent {
  readonly width = input<string>('100%');
  readonly height = input<string>('16px');
  readonly radius = input<string>('4px');
}

import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
export class ImageFallbackDirective {
  readonly fallbackUrl = input<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80');

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    const element = this.el.nativeElement;
    if (element.src !== this.fallbackUrl()) {
      element.src = this.fallbackUrl();
    }
  }
}

import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusHighlight]'
})
export class FocusHighlightDirective {
  @Input('appFocusHighlight') public focusClass: string;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  @HostListener('focus')
  public onFocus(): void {
    this.renderer2.addClass(this.elementRef.nativeElement, this.focusClass);
  }

  @HostListener('blur')
  public onBlur(): void {
    this.renderer2.removeClass(this.elementRef.nativeElement, this.focusClass);
  }
}

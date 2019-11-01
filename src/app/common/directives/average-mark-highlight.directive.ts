import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

export interface IAverageMarkColor {
  maxAverageMark: number;
  class: string;
}

@Directive({
  selector: '[appAverageMarkHighlight]'
})
export class AverageMarkHighlightDirective {
  @Input('appAverageMarkHighlight') public averageMark: number;
  @Input() public averageMarkColors: IAverageMarkColor[];

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  private highlight(cssClass: string): void {
    this.averageMarkColors.forEach((averageMarkColor) => {
      this.renderer2.removeClass(this.elementRef.nativeElement, averageMarkColor.class);
    });

    this.renderer2.addClass(this.elementRef.nativeElement, cssClass);
  }

  public ngOnChanges(): void {
    const averageMarkColor: IAverageMarkColor = this.averageMarkColors.find(currentAverageMarkColor =>
      currentAverageMarkColor.maxAverageMark > this.averageMark
    );

    this.highlight(averageMarkColor.class);
  }

}

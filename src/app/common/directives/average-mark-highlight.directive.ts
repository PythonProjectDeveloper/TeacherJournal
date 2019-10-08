import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAverageMarkHighlight]'
})
export class AverageMarkHighlightDirective {
  @Input() public averageMark: number;

  public averageMarkColors = [
    { maxAverageMark: 5, color: '#002bff1f' },
    { maxAverageMark: 11, color: '#149a041c' }
  ]

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) { }
  
  public ngOnChanges(): void {
    const averageMarkColor = this.averageMarkColors.find(averageMarkColor =>
      averageMarkColor.maxAverageMark > this.averageMark
    );

    this.highlight(averageMarkColor.color);
  }

  private highlight(color: string) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', color);
  }

}

import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberCheck]'
})
export class NumberCheckDirective {
  @Input() public maxNumber: number;
  @Input() public minNumber: number;

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  public onInput(inputValue: string): void {
    let value: string | number = parseInt(inputValue, 10);

    if (Number.isNaN(value)) {
      value = '';
    } else if (this.minNumber > value || value > this.maxNumber) {
      value = inputValue.slice(0, -1);
    }

    this.elementRef.nativeElement.value = value;
  }
}

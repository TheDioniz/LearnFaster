import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCustomAutofocus]'
})
export class CustomAutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}

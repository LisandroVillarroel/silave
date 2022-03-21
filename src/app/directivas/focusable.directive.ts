import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[focsusable]'
})
export class FocusableDirective {

  constructor(private host: ElementRef) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

}

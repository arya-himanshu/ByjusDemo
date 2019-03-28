import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { consumeBinding } from '@angular/core/src/render3/instructions';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutSideDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();
  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    console.log(clickedInside)
    if (!clickedInside) {
      this._elementRef.nativeElement.display = "none";
    }
  }
}

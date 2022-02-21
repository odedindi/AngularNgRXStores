import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  NgModule,
} from '@angular/core';

@Directive({
  selector: '[required]',
})
export class RequiredSignDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const parent = this.renderer.parentNode(this.el.nativeElement);
    if (parent.getElementsByTagName('LABEL').length)
      parent.getElementsByTagName('LABEL')[0].innerHTML +=
        ' <span class="required-asterisk">*</span>';
  }
}

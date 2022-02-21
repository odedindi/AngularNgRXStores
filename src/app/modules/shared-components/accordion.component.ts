import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: ` <div class="accordion accordion-flush" id="accordionFlush">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button
          [class]="isActive ? openButton : collapsedButton"
          (click)="setIsActive(!isActive)"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          {{ title }}
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        [class]="isActive ? openAccordion : collapseAccordion"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlush"
      >
        <div class="accordion-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  </div>`,
})
export class AccordionComponent {
  @Input() title: string = '';

  public isActive = false;
  public setIsActive = (bool: boolean) => (this.isActive = bool);

  public openButton = 'accordion-button open';
  public collapsedButton = 'accordion-button collapsed';

  public openAccordion = 'accordion-collapse open';
  public collapseAccordion = 'accordion-collapse collapse';
}

import { Directive, Input, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: 'button[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') tooltipTitle: string;
  @ViewChild('patientDDL') patientDDL:ElementRef;
  @Input() placement: string;
  @Input() visibility: string;
  @Input() delay: string;
  tooltip: HTMLElement;
  offset = 10;
  tooltip1;


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    console.log(btn);
    console.log(this.visibility);
    console.log(this.tooltip);
    if (this.visibility == "show") { this.show(); this.visibility = "hide";  this.tooltip1 = this.tooltip}
    else if (this.visibility == "hide") { this.hide(); this.visibility = "show"}
    

    // if (this.tooltip) { this.hide(); }
  }

  // @HostListener('click') onMouseLeave() {
  //   if (this.tooltip) { this.hide(); }
  // }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    
    console.log(this.tooltip1);
    if(this.tooltip1 != null){
      this.renderer.removeClass(this.tooltip1, 'ng-tooltip-show');
   
      this.renderer.removeChild(document.body, this.tooltip1);
      this.tooltip1 = null;
    }
    
   
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) 
    );

    this.renderer.appendChild(document.body, this.tooltip);
    

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);


    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
   
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    
    const tooltipPos = this.tooltip.getBoundingClientRect();


    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log(scrollPos);
        let top, left;

    if (this.placement === 'top') {
      this.placement = "top";
      this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (scrollPos >= 25) {
      this.placement = 'bottom';
      this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    this.placement = "top";

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}

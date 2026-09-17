import {
  Directive,
  ElementRef,
  inject,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
export type Permission = 'admin' | 'user';

@Directive({ selector: '[appHaspermission]' })
export class HaspermissionDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly permissionList: Partial<Permission>[] = ['user'];
  private readonly renderer2 = inject(Renderer2);

  @Input() set appHaspermission(value: Permission) {
    const allowed = this.permissionList.includes(value);
    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'display',
      allowed ? '' : 'none'
    );
  }
}

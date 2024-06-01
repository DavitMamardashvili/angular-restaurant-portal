import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { DynamicHostDirective } from '../../directives/dynamic-host.directive';
import { ErrorAlertComponent } from '../../../shared/components/alerts/error-alert/error-alert.component';
import { SuccessAlertComponent } from '../../../shared/components/alerts/success-alert/success-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  createErrorAlert(hostDirective: DynamicHostDirective, message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorAlertComponent);
    const viewContainerRef = hostDirective.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.message = message;
    componentRef.instance.closeAlert = () => {
      viewContainerRef.clear();
    };
  }

  createSuccessAlert(hostDirective: DynamicHostDirective, message: string){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SuccessAlertComponent);
    const viewContainerRef = hostDirective.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.message = message;
    componentRef.instance.closeAlert = () => {
      viewContainerRef.clear();
    };
  }
}

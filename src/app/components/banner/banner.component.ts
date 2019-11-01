import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ComponentRef, ViewChild } from '@angular/core';
import { BannerService } from 'src/app/common/services/banner.service';
import { BannerDirective } from 'src/app/common/directives/banner.directive';
import { SimpleMessageComponent } from './simple-message/simple-message.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  host: {
    '[class.hidden]': '!isOpen'
  },
})
export class BannerComponent implements OnInit {
  @ViewChild(BannerDirective, {static: true}) public bannerHost: BannerDirective;
  public isOpen: boolean = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private bunnerService: BannerService
  ) { }

  public ngOnInit(): void {
    this.bunnerService.getBannerStatus().subscribe(isOpen => this.isOpen = isOpen);
    this.bunnerService.getBunner().subscribe(data => this.loadComponent(data));
  }

  public loadComponent(data: any): void {
    const componentFactory: ComponentFactory<SimpleMessageComponent> = this.componentFactoryResolver
                                                                            .resolveComponentFactory(SimpleMessageComponent);

    const viewContainerRef: ViewContainerRef = this.bannerHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: ComponentRef<SimpleMessageComponent> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = data;
  }

  public onClose(): void {
    this.bunnerService.setBannerStatus(false);
  }
}

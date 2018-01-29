import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HudCard } from '../hud-card';

@Component({
  selector: 'app-hud-card-spawner-component',
  templateUrl: './hud-card-spawner-component.component.html',
  styleUrls: ['./hud-card-spawner-component.component.css']
})
export class HudCardSpawnerComponentComponent implements OnInit {
  @ViewChild('spawn', {read: ViewContainerRef}) container;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  @Input() set card(data: HudCard) {
    if (!data) return;
    let inputProviders = Object.keys(data.inputs).map((inputName) =>
    {
      return {provide: data.inputs[inputName].key, 
              useValue: data.inputs[inputName].value, 
              deps: []};
    });
    let injector = Injector.create(inputProviders,this.container.parentInjector);
    let factory = this.resolver.resolveComponentFactory(data.component);
    let component = factory.create(injector);
    this.container.insert(component.hostView);
  }

}

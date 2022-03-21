import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem} from './../../../../modelo/menu-interface';
import {Router} from '@angular/router';
import {MenuService} from './../../../../servicios/menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-list-item-perfil',
  templateUrl: './menu-list-item-perfil.component.html',
  styleUrls: ['./menu-list-item-perfil.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemPerfilComponent implements OnInit {

  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input()
  item!: MenuItem;
  @Input()
  depth!: number;


  constructor(public router: Router, private navService: MenuService

) {
  if (this.depth === undefined) {
    this.depth = 0;
  }
  console.log('menuuuuuu',this.item)

}

ngOnInit() {

  this.navService.currentUrl.subscribe((url: string) => {
    if (this.item.route && url) {
      // console.log(`Checking '/${this.item.route}' against '${url}'`);
      this.expanded = url.indexOf(`/${this.item.route}`) === 0;
      this.ariaExpanded = this.expanded;
      // console.log(`${this.item.route} is expanded: ${this.expanded}`);
    }
  });
}

onItemSelected($event: any, item: MenuItem) {

  if (item.route === 'cerrar'){
    console.log('paso1111');
    this.router.navigate(['/hospital']);
  }else{
    if (!item.children || !item.children?.length) {
      this.router.navigate(['' + item.route]);
    }
    if (item.children && item.children?.length) {
      this.expanded = !this.expanded;
    }
  }
}


getMenuChildren() {
  return this.item.children?.filter((item) => item.selected === false);
}




allComplete: boolean = false;

updateAllComplete() {
 // this.allComplete = this.item != null && this.item.every(t => t.disabled);
}


someComplete(): boolean {
  if (this.item == null) {
    return false;
  }
  return false; //this.item.filter(t => t.disabled).length > 0 && !this.allComplete;
}

setAll(completed: boolean) {
  this.allComplete = completed;
/*  if (this.task.subtasks == null) {
    return;
  }
  this.task.subtasks.forEach(t => (t.completed = completed));
  */
}

}

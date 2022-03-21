import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem} from './../../modelo/menu-interface';
import {Router} from '@angular/router';
import {MenuService} from './../../servicios/menu.service';
import { AuthenticationService } from '../../autentica/_services';
import { JwtResponseI } from '../../autentica/_models';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.css'],
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
export class MenuListItemComponent implements OnInit {


  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input()
  item!: MenuItem;
  @Input()
  depth!: number;

  @Output() tituloModuloF = new EventEmitter();
  @Output() tituloModuloF2 = new EventEmitter();
  @Output() tituloModuloF3 = new EventEmitter();
  constructor(public router: Router, private navService: MenuService,
    private authenticationService: AuthenticationService,
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
  console.log('paso00000',item.route);
  if (item.route === 'cerrar'){
    console.log('paso1111');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }else{
  if (!item.children || !item.children?.length) {
    // this.router.navigate([item.route]);
    this.tituloModuloF.emit('  -  ( ' + item.displayName + ' )');
    this.tituloModuloF2.emit('  -  ( ' + item.displayName + ' )');
    this.router.navigate(['' + item.route]);
  //  this.navService.closeNav();
  }
  if (item.children && item.children?.length) {
    this.tituloModuloF.emit('  -  ( ' + item.displayName + ' )');
    this.tituloModuloF2.emit('  -  ( ' + item.displayName + ' )');
    this.expanded = !this.expanded;
  }
}

}

traeTituloModulo(valor:any){
  this.tituloModuloF.emit(valor);
  this.tituloModuloF2.emit(valor);
}

traeTituloModulo2(valor:any){
  this.tituloModuloF.emit(valor);
}

getMenuChildren() {
  return this.item.children?.filter((item) => item.selected === true);
}



}

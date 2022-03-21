import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy,Input, OnInit } from '@angular/core';
//import { IConsultaLoginPerfil, IInicio, IMenuLateral } from '@app/interface/inicio';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

import {MenuItem} from './../../modelo/menu-interface';
import { JwtResponseI } from './../../../app/autentica/_models';
import { AuthenticationService } from './../../autentica/_services';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import Swal from 'sweetalert2';
import { MenuService } from '@app/servicios/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-mat',
  templateUrl: './menu-mat.component.html',
  styleUrls: ['./menu-mat.component.css']
})
export class MenuMatComponent implements OnDestroy {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  position = new FormControl(this.positionOptions[0]);

  currentUsuario!: JwtResponseI;

  menuItems!: MenuItem[];

  flag=false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private location: Location,
    private authenticationService: AuthenticationService,
    private router: Router,
    private usuarioLabService:UsuarioLabService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._MOBILEQUERYLISTENER = () => changeDetectorRef.detectChanges();
    // deprecated: MediaQueryList.addListener(listener);

    this.mobileQuery.addEventListener('change', this._MOBILEQUERYLISTENER);
    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    console.log('pasa ficha 1',this.authenticationService.getCurrentUser());
        if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
        }

        this.getDataMenu();

    console.log('paso menu')
  }



  mobileQuery: MediaQueryList;



  getDataMenu(){
    console.log('usuario id:',this.currentUsuario.usuarioDato._id);
    this.usuarioLabService
    .getDataUsuarioId(this.currentUsuario.usuarioDato._id)
    .subscribe(res => {
      console.log('usuario: ', res.data);
      this.menuItems=res.data[0].MenuItem;
      this.flag=true;
    },
    // console.log('yo:', res as PerfilI[]),
    error => {
      console.log('error carga:', error);
      Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
     );
    }
    );
  }

/*
menuItems: MenuItem[] = [

      {
        displayName: 'Inicio',
        iconName: 'home',
        route: 'inicio',
        disabled: false
      },
      {
        displayName: 'Administra Usuario',
        iconName: 'local_hospital',
        route: 'administraUsuario',
        tipoPermiso:'Administrador',
        disabled: false
      },
      {
        displayName: 'Ingreso Ficha',
        iconName: 'local_hospital',
        route: 'ingresoFicha',
        tipoPermiso:'Administrador', //Basico
        disabled: false
      },
      {
        displayName: 'Ingreso Exámen',
        iconName: 'local_hospital',
        route: 'ingresoExamenFicha',
        tipoPermiso:'Administrador', // Basico
        disabled: false
      },
      {
        displayName: 'Consulta Exámen',
        iconName: 'local_hospital',
        route: 'consultaExamenFicha',
        tipoPermiso:'Administrador', // Basico
        disabled: false
      },
      {
        displayName: 'Mantenedores',
        iconName: 'list',
        disabled: false,
        children: [
        {
            displayName: 'Cliente',
            iconName: 'forward',
            route: 'mantenedorCliente',
            tipoPermiso:'Administrador',
            disabled: false
        },
        {
          displayName: 'Doctor Solicitante',
          iconName: 'forward',
          route: 'doctorSolicitante',
          tipoPermiso:'Administrador',
          disabled: false
        },
        {
          displayName: 'Exámen',
          iconName: 'forward',
          route: 'mantenedorExamen',
          tipoPermiso:'Administrador',
          disabled: false
        },
        {
          displayName: 'Especie',
          iconName: 'forward',
          route: 'mantenedorEspecie',
          tipoPermiso:'Administrador',
          disabled: false
        },
        {
          displayName: 'Raza',
          iconName: 'forward',
          route: 'mantenedorRaza',
          tipoPermiso:'Administrador',
          disabled: false
        },
        {
          displayName: 'Formatos',
          iconName: 'forward',
          route: 'mantenedorFormatos',
          tipoPermiso:'Administrador',
          disabled: false
        }
        ]
      },
      {
        displayName: 'Cerrar',
        iconName: 'exit_to_app',
        route: '',
        disabled: false
      },
    ]
  ;
*/
  private _MOBILEQUERYLISTENER: () => void;

  shouldRun = true;

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._MOBILEQUERYLISTENER);
  }

  traeTituloModulo(valor:any){
   // this.tituloModulo = valor;
  }

   getMenu() {
    console.log('item:',this.menuItems)
   return this.menuItems.filter((item) => item.selected === true);
  }


/*
  fillerNav = [
    {name: 'Inicio', route: 'inicio', icon: ''},
    {name: 'Usuarios', route: 'usu', icon: ''},
    {name: 'Cotización', route: 'usu', icon: ''},
    {name: 'Orden de Trabajo', route: 'usu', icon: ''},
    {name: 'Inventario', route: 'inventario', icon: ''},
    {name: 'Factura', route: 'PuntoVenta', icon: ''},
    {name: 'Mantenedores', route: 'usu', icon: ''},
    {name: 'Home', route: 'home', icon: ''}
  ];
*/

cerrar(){
  this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}

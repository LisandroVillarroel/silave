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
import { EmpresaService } from '@app/servicios/empresa.service';
import { ClienteService } from '@app/servicios/cliente.service';

@Component({
  selector: 'app-menu-mat',
  templateUrl: './menu-mat.component.html',
  styleUrls: ['./menu-mat.component.css']
})
export class MenuMatComponent implements OnDestroy,OnInit {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  position = new FormControl(this.positionOptions[0]);

  currentUsuario!: JwtResponseI;

  menuItems!: MenuItem[];

  nombreSiglaEmp:string='';
  nombreTipoEmp:string='';
  nombreLogoEmpresa:string="./../../../assets/imagenes/sinLogo.jpg";

  flag=false;
  accesoDatosEmpresa:boolean=false;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private location: Location,
    private authenticationService: AuthenticationService,
    private router: Router,
    private usuarioLabService:UsuarioLabService,
    private empresaService: EmpresaService,
    private clienteService: ClienteService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._MOBILEQUERYLISTENER = () => changeDetectorRef.detectChanges();
    // deprecated: MediaQueryList.addListener(listener);

    this.mobileQuery.addEventListener('change', this._MOBILEQUERYLISTENER);
    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
        if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
        }

        this.getDataMenu();
  }

  ngOnInit() {
    if (this.currentUsuario.usuarioDato.empresa.tipoEmpresa=='Laboratorio' || this.currentUsuario.usuarioDato.empresa.tipoEmpresa=='Administrador General'){
      this.getEmpresa(this.currentUsuario.usuarioDato.empresa.empresa_Id);
      this.nombreTipoEmp =this.currentUsuario.usuarioDato.empresa.tipoEmpresa;
  }else{
    this.nombreSiglaEmp!= this.currentUsuario.usuarioDato.cliente?.nombreFantasia;
    this.nombreTipoEmp='Veterinaria';
  }
  }

  mobileQuery: MediaQueryList;


  getEmpresa(idEmpresa:string): any  {
    console.log('empresa busca:',idEmpresa);
    this.empresaService
      .getDataEmpresa(idEmpresa)
      .subscribe(res => {
        console.log('empresa:', res['data'][0])
        this.nombreSiglaEmp= res['data'][0].nombreFantasia;
        console.log('logoooo:',res['data'][0]?.nombreLogo)
        if (res['data'][0]?.nombreLogo !== undefined && res['data'][0]?.nombreLogo!==''  && res['data'][0]?.nombreLogo!=='sinLogo.jpg') {
          this.nombreLogoEmpresa= "./../../../assets/imagenes/"+res['data'][0].rutEmpresa+'/'+res['data'][0].nombreLogo;
        }
        console.log('logoooo2:',this.nombreLogoEmpresa)
      },

      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
         'error'
       );

      }
    ); // (this.dataSource.data = res as PerfilI[])

  }



  getDataMenu(){
    this.usuarioLabService
    .getDataUsuarioId(this.currentUsuario.usuarioDato._id)
    .subscribe(res => {
      this.menuItems=res.data[0].MenuItem;
      console.log('menu:',res)
      for(let a=0; a<res.data[0].MenuItem.length; a++){
        if (res.data[0].MenuItem[a].route=='administraUsuario' && res.data[0].MenuItem[a].tipoPermiso=='Administrador')
        {
          this.accesoDatosEmpresa=true;
          console.log('Tipo empresa:',res.data[0].MenuItem[a].tipoPermiso);
        }
      }
      this.flag=true;
    },
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

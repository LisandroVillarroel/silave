import { IUsuario, IUsuarioCliente, IUsuarioEmpresa } from '@app/modelo/usuario-interface';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, OnInit } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";
import { JwtResponseI } from "@app/autentica/_models";
import { MenuItem } from "@app/modelo/menu-interface";
import { MenuService } from "@app/servicios/menu.service";
import { AuthenticationService } from "@app/autentica/_services";
import Swal from "sweetalert2";

import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';
/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */


/**
 * @title Tree with nested nodes
 */
 @Component({
  selector: 'app-agrega-perfil-usuario',
  templateUrl: './agrega-perfil-usuario.component.html',
  styleUrls: ['./agrega-perfil-usuario.component.css']
})
export class AgregaPerfilUsuarioComponent implements  OnInit  {

  selectTipoPermiso = [{ value: 'Administrador', nombre: 'Administrador'}, { value: 'Básico', nombre: 'Básico'}];


  tipoPermiso = new FormControl('', Validators.required);

  currentUsuario!: JwtResponseI;

  menuItems!: MenuItem[];
  menuItemsResultado!: MenuItem[];
  menuItemsResultado2!: MenuItem[];
  datoCliente!: ICliente[];

  datoUsuario!: IUsuario;
  datoUsuarioEmpresa!: IUsuarioEmpresa;
  datoUsuarioCliente!: IUsuarioCliente;

  /*tree*/
  treeControl = new NestedTreeControl<MenuItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItem>();
  /*fin tree*/


  secondFormGroup!: FormGroup;

  PnombreTipoEmpresa!: string;
  PnombreCliente:string='';

  Pmenu_Id!: string;

  selectTipoEmpresa: { menu_Id: string, nombre: string} []=[];

  flagCliente=false;

  tipoUsuarioLaboratorio:boolean=true;// Permite ver si es Usuario Veterinario o Laboratorio

  constructor(private dialogRef: MatDialogRef<AgregaPerfilUsuarioComponent>,
    private menuService:MenuService,
    private clienteService:ClienteService,
    private usuarioLabService: UsuarioLabService,
    private authenticationService:AuthenticationService,
    private _formBuilder: FormBuilder) {



    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    this.getDataMenuTipoEmpresa();
    this.cargaCliente();

  }

  validarQueSeanIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('contrasena');
    const confirmarPassword = control.get('contrasena2');

    return password?.value === confirmarPassword?.value ? null : { 'noSonIguales': true };
  };


  usuario = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  contrasena2 = new FormControl('', [Validators.required]);
  rutUsuario = new FormControl('', [Validators.required, this.validaRut]);

  nombres = new FormControl('', [Validators.required]);
  apellidoPaterno = new FormControl('', [Validators.required]);
  apellidoMaterno = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  telefono = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);
  tipoEmpresa = new FormControl('', [Validators.required]);
  idCliente = new FormControl('',Validators.nullValidator);  //La validación depende de Tipo Empresa

  agregaUsuario = this._formBuilder.group({
    usuario: this.usuario,
    contrasena: this.contrasena,
    contrasena2: this.contrasena2,
    rutUsuario: this.rutUsuario,
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    email: this.email,
    telefono: this.telefono,
    direccion: this.direccion,
    tipoEmpresa:this.tipoEmpresa,
    idCliente:this.idCliente
    // address: this.addressFormControl
  },{validators: [this.validarQueSeanIguales]});

  checarSiSonIguales(): boolean {
    if (this.agregaUsuario.hasError('noSonIguales')  &&
    this.agregaUsuario.get('contrasena')?.dirty &&  this.agregaUsuario.get('contrasena2')?.dirty){
      return true
    }
    return  false;
  }

  getErrorMessage(campo: string){
    if (campo === 'usuario'){
      return this.usuario.hasError('required') ? 'Debes ingresar Usuario'  : '';
    }
    if (campo === 'contrasena'){
      return this.contrasena.hasError('required') ? 'Debes ingresar Contraseña'  : '';
    }
    if (campo === 'contrasena2'){
      return this.contrasena2.hasError('required') ? 'Debes ingresar Segúnda Contraseña'  : '';
    }

    if (campo === 'rutUsuario'){
        return this.rutUsuario.hasError('required') ? 'Debes ingresar Rut' :
        this.rutUsuario.hasError('rutInvalido') ? 'Rut Inválido' : '';
    }
    if (campo === 'nombres'){
        return this.nombres.hasError('required') ? 'Debes ingresar Nombres'  : '';
    }
    if (campo === 'apellidoPaterno'){
        return this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paterno' : '';
    }
    if (campo === 'apellidoMaterno'){
      return this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' : '';
  }
    if (campo === 'direccion'){
        return this.direccion.hasError('required') ? 'Debes ingresar Dirección' : '';
    }
    if (campo === 'telefono'){
      return this.telefono.hasError('required') ? 'Debes ingresar Teléfono' : '';
    }
    if (campo === 'email'){
      return this.email.hasError('required') ? 'Debes ingresar Email' : '';
    }

    if (campo === 'tipoEmpresa'){
      return this.tipoEmpresa.hasError('required') ? 'Debes ingresar Tipo Empresa' : '';
    }
    if (campo === 'idCliente'){
      return this.idCliente.hasError('required') ? 'Debes Seleccionar Cliente' : '';
    }
    return '';
  }


  ngOnInit() {

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

 //Permite ver si es Usuario Veterinario o Laboratorio
    if (this.currentUsuario.usuarioDato.cliente!.idCliente){  // si no tiene info
      this.tipoUsuarioLaboratorio=false;

      this.Pmenu_Id=this.currentUsuario.usuarioDato.empresa.menu_Id;

      this.getDataMenu(this.Pmenu_Id);

      this.agregaUsuario.get('tipoEmpresa')!.clearValidators();
      this.agregaUsuario.get('tipoEmpresa')!.setValidators([Validators.nullValidator]);
      this.agregaUsuario.get('tipoEmpresa')!.updateValueAndValidity();

      this.agregaUsuario.get('idCliente')!.clearValidators();
      this.agregaUsuario.get('idCliente')!.setValidators([Validators.nullValidator]);
      this.agregaUsuario.get('idCliente')!.updateValueAndValidity();
    }
  }

  /*tree*/

   hasChild = (_: number, node: MenuItem) =>
    !!node.children && node.children.length > 0;
  setParent(data: any, parent: any) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach((x: any) => {
        this.setParent(x, data);
      });
    }
  }

  checkAllParents(node: any) {

    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every(child => child.selected);
  //    node.parent.tipoPermiso = descendants.every(child => child.tipoPermiso);
      node.parent.indeterminate = descendants.some(child => child.selected);
      this.checkAllParents(node.parent);
    }else{
      const descendants = this.treeControl.getDescendants(node);
      node.selected = descendants.every(child => child.selected);
    //  node.tipoPermiso = descendants.every(child => child.tipoPermiso);
      node.indeterminate = descendants.some(child => child.selected);
    }

  }

  todoItemSelectionToggle(checked: any, node: { selected: any; children: any[]; }) {
    node.selected = checked;
    if (node.children) {
      node.children.forEach(x => {
        this.todoItemSelectionToggle(checked, x);
      });
    }
    this.checkAllParents(node);
  }

  tipoPermisoAllParents(node: any) {

    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.tipoPermiso = descendants.every(child => child.tipoPermiso);
      this.tipoPermisoAllParents(node.parent);
    }else{
      const descendants = this.treeControl.getDescendants(node);
      node.tipoPermiso = descendants.every(child => child.tipoPermiso);
    }

  }

  grabaTipoPermiso(tipoPermiso: any, node: any) {
    node.tipoPermiso = tipoPermiso;
  /*  if (node.children) {
      node.children.forEach((x: any) => {
        this.grabaTipoPermiso(tipoPermiso, x);
      });
    }
    this.tipoPermisoAllParents(node);
*/
  }

  /*Fin tree*/
  getDataMenuTipoEmpresa(){

    this.menuService
    .getDataMenuTodo()
    .subscribe(res => {
      console.log('res:',res.data);
      for(let a=0; a<res.data.length; a++){
        if (res.data[a].nombreMenu!='Administrador General' )
        {
          var arreglo={"value":res.data[a]._id, "nombre":res.data[a].nombreMenu};
          console.log('arreglo:',arreglo);
        /* this.selectTipoEmpresa[a].value=res.data[a]._id;
          this.selectTipoEmpresa[a].nombre=res.data[a].nombreMenu;*/
          this.selectTipoEmpresa.push({"menu_Id": res.data[a]._id, "nombre":res.data[a].nombreMenu});
          console.log('Tipo empresa:',this.selectTipoEmpresa);
        }
      }
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

  getDataMenu(P_menu_Id:string){

    this.menuService
    .getDataMenu(P_menu_Id)
    .subscribe(res => {
      console.log('menu:',res)
      this.menuItems=res.data[0].MenuItem;
      //this.flag=true;
      this.dataSource.data = this.menuItems; //TREE_DATA;
      Object.keys(this.dataSource.data).forEach(x => {
        this.setParent(this.dataSource.data[x as any], null);
      });
    },
    // console.log('yo:', res as PerfilI[]),
    error => {
      console.log('error carga:', error);
      Swal.fire(
        'ERROR INESPERADO',
        error.error.error,
       'error'
     );
    }
    );
  }




  validaRut(control: FormControl): {[s: string]: boolean} {
    // let out1_rut = this.rutService.getRutChile(0, '12514508-6');
    if (validateRut(control.value) === false){
        return {rutInvalido: true};
    }
    return null as any;
  }

  onBlurRutUsuario(event: any){
    const rut = event.target.value;

    if (validateRut(rut) === true){
      this.agregaUsuario.get('rutUsuario')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  cerrar(){}


  async enviar(){
    let result: any[] = [];
    await this.dataSource.data.forEach(node => {
      result = result.concat(
        this.treeControl
          .getDescendants(node)
        //  .filter(x => x.selected && x._id)
        //  .map(x => x._id)
      );

    });



    this.menuItemsResultado=this.dataSource.data;

    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key: any, value: object | null) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    this.menuItemsResultado=await JSON.parse(JSON.stringify(this.menuItemsResultado, getCircularReplacer())); // Permite pasar estructura al modelo

    console.log('paso agrega 1')
    await this.marcaInicioChildren();
    console.log('paso agrega 3')

    if (this.tipoUsuarioLaboratorio){
      this.datoUsuarioEmpresa = {
        empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,
        rutEmpresa: this.currentUsuario.usuarioDato.empresa.rutEmpresa,
        menu_Id: this.Pmenu_Id,
        tipoEmpresa: this.PnombreTipoEmpresa

      }

      this.datoUsuarioCliente = {
        idCliente:this.agregaUsuario.get('idCliente')!.value,
        nombreFantasia:this.PnombreCliente
      }



      this.datoUsuario = {
        usuario: this.agregaUsuario.get('usuario')!.value.toUpperCase(),
        contrasena: this.agregaUsuario.get('contrasena')!.value,
        rutUsuario: this.agregaUsuario.get('rutUsuario')!.value.toUpperCase(),
        nombres: this.agregaUsuario.get('nombres')!.value,
        apellidoPaterno: this.agregaUsuario.get('apellidoPaterno')!.value,
        apellidoMaterno: this.agregaUsuario.get('apellidoMaterno')!.value,
        empresa: this.datoUsuarioEmpresa,
        cliente: this.datoUsuarioCliente,
        telefono: this.agregaUsuario.get('telefono')!.value,
        email: this.agregaUsuario.get('email')!.value,
        direccion: this.agregaUsuario.get('direccion')!.value,
        MenuItem: this.menuItemsResultado,
        usuarioCrea_id: this.currentUsuario.usuarioDato.usuario,
        usuarioModifica_id: this.currentUsuario.usuarioDato.usuario

      };
    }
    else{  // Veterinaria
      this.datoUsuarioEmpresa = {
        empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,
        rutEmpresa: this.currentUsuario.usuarioDato.empresa.rutEmpresa,
        menu_Id: this.Pmenu_Id,
        tipoEmpresa: 'Administrador Veterinaria'

      }

      this.datoUsuarioCliente = {
        idCliente:this.currentUsuario.usuarioDato.cliente?.idCliente,
        nombreFantasia:this.currentUsuario.usuarioDato.cliente?.nombreFantasia
      }



      this.datoUsuario = {
        usuario: this.agregaUsuario.get('usuario')!.value.toUpperCase(),
        contrasena: this.agregaUsuario.get('contrasena')!.value,
        rutUsuario: this.agregaUsuario.get('rutUsuario')!.value.toUpperCase(),
        nombres: this.agregaUsuario.get('nombres')!.value,
        apellidoPaterno: this.agregaUsuario.get('apellidoPaterno')!.value,
        apellidoMaterno: this.agregaUsuario.get('apellidoMaterno')!.value,
        empresa: this.datoUsuarioEmpresa,
        cliente: this.datoUsuarioCliente,
        telefono: this.agregaUsuario.get('telefono')!.value,
        email: this.agregaUsuario.get('email')!.value,
        direccion: this.agregaUsuario.get('direccion')!.value,
        MenuItem: this.menuItemsResultado,
        usuarioCrea_id: this.currentUsuario.usuarioDato.usuario,
        usuarioModifica_id: this.currentUsuario.usuarioDato.usuario

      };
    }
    console.log('datoUsuario:',this.datoUsuario);
    this.usuarioLabService.postDataUsuario(this.datoUsuario)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
              Swal.fire(
              'Se agregó con Éxito',
              '',
              'success'
            ); // ,
              this.dialogRef.close(1);
          }else{
            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Usuario:', dato);
              Swal.fire(
                '',
                'ERROR SISTEMA',
                'error'
              );
            }
          }
        }
      );
  }

  marcaInicioChildren(){
    console.log('paso agrega 2')
    let flag=0;
    for(let b=0; b<this.menuItemsResultado.length; b++){
      flag=0;
      if (this.menuItemsResultado[b].children && this.menuItemsResultado[b].children!.length) {
        for(let c=0; c<this.menuItemsResultado[b].children!.length; c++){
           if (this.menuItemsResultado[b].children![c].selected==true){
              this.menuItemsResultado[b].selected=true;
              flag=1;
              break
           }
        }
        if (flag==1){
          break
        }
      }
    }
  }


  seleccionaTipoEmpresa(p:any){

    this.PnombreTipoEmpresa=p.nombre;
    this.Pmenu_Id=p.menu_Id;
    console.log('ppTipoEmpresa:',p);
    this.getDataMenu(p.menu_Id);

    this.agregaUsuario.get('idCliente')!.clearValidators();
    if (p.nombre=='Laboratorio'){
      this.flagCliente=false;
      this.agregaUsuario.get('idCliente')!.setValidators([Validators.nullValidator]);
    }
    else{
      this.flagCliente=true;
      this.agregaUsuario.get('idCliente')!.setValidators([Validators.required]);
    }
    this.agregaUsuario.get('idCliente')!.updateValueAndValidity();
    return;
  }

  seleccionaCliente(p:any){

    this.PnombreCliente=p.nombreFantasia;

    return;
  }
  cargaCliente(){
    this.clienteService
    .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id!)
    .subscribe(res => {
      console.log('cliente:', res['data'])
      this.datoCliente = res['data'] ;
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
  ); // (this.dataSource.data = res as PerfilI[])
  }

}



/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

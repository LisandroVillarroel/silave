
import { IUsuario } from '@app/modelo/usuario-interface';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { Component, Inject, OnInit } from "@angular/core";

import { IUsuarioEmpresa, JwtResponseI } from "@app/autentica/_models";
import { MenuItem } from "@app/modelo/menu-interface";
import { MenuService } from "@app/servicios/menu.service";
import { AuthenticationService } from "@app/autentica/_services";
import Swal from "sweetalert2";

import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */


/**
 * @title Tree with nested nodes
 */
 @Component({
  selector: 'app-modifica-perfil-usuario',
  templateUrl: './modifica-perfil-usuario.component.html',
  styleUrls: ['./modifica-perfil-usuario.component.css']
})
export class ModificaPerfilUsuarioComponent implements  OnInit  {

  selectTipoPermiso = [{ value: 'Administrador', nombre: 'Administrador'}, { value: 'Básico', nombre: 'Básico'}];
  selectEstadoUsuario = [{ nombre: 'Activo', id: 'Activo'}, { nombre: 'Inactivo', id: 'Inactivo'}];

  tipoPermiso = new FormControl('', Validators.required);

  currentUsuario!: JwtResponseI;

  menuItems!: MenuItem[];
  menuItemsResultado!: MenuItem[];
  menuItemsResultadoFiltro!: MenuItem[];

  datoUsuarioPar!: IUsuario;
  datoUsuario!: IUsuario;
  datoUsuarioEmpresa!: IUsuarioEmpresa;

  /*tree*/
  treeControl = new NestedTreeControl<MenuItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItem>();
  /*fin tree*/


  secondFormGroup!: FormGroup;

  constructor(private dialogRef: MatDialogRef<ModificaPerfilUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuService:MenuService,
    private usuarioLabService: UsuarioLabService,
    private authenticationService:AuthenticationService,
    private _formBuilder: FormBuilder) {

      this.datoUsuarioPar = data;
    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    //Carga Menu
    /*
    this.dataSource.data = this.data.MenuItem; //TREE_DATA;
    Object.keys(this.dataSource.data).forEach(x => {
      this.setParent(this.dataSource.data[x as any], null);
    });
    */
    //Fin Carga Menu
    this.getDataMenu();
  }


  rutUsuario = new FormControl(this.data.rutUsuario, [Validators.required, this.validaRut]);

  nombres = new FormControl(this.data.nombres, [Validators.required]);
  apellidoPaterno = new FormControl(this.data.apellidoPaterno, [Validators.required]);
  apellidoMaterno = new FormControl(this.data.apellidoMaterno, [Validators.required]);
  email = new FormControl(this.data.email, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  telefono = new FormControl(this.data.telefono, [Validators.required]);
  direccion = new FormControl(this.data.direccion, [Validators.required]);
  estadoUsuario = new FormControl(this.data.estadoUsuario, [Validators.required]);

  agregaUsuario = this._formBuilder.group({

    rutUsuario: this.rutUsuario,
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    email: this.email,
    telefono: this.telefono,
    direccion: this.direccion,
    estadoUsuario: this.estadoUsuario

    // address: this.addressFormControl
  });

  checarSiSonIguales(): boolean {
    if (this.agregaUsuario.hasError('noSonIguales')  &&
    this.agregaUsuario.get('contrasena')?.dirty &&  this.agregaUsuario.get('contrasena2')?.dirty){
      return true
    }
    return  false;
  }

  getErrorMessage(campo: string){

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
    return '';
  }

  ngOnInit() {

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
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

  getDataMenu(){
    let flag=0;

    this.menuService
    .getDataMenu(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {
      this.menuItems=res.data[0].MenuItem;
      //this.flag=true;
      console.log('paso data ',this.data.MenuItem);
      console.log('paso rescata',res.data[0].MenuItem);
      for(let b=0; b<this.menuItems.length; b++){
        if (this.menuItems[b].children && this.menuItems[b].children!.length) {
          for(let c=0; c<this.menuItems[b].children!.length; c++){
            flag=0;
            for(let d=0; d<this.data.MenuItem.length; d++){
              if (this.data.MenuItem[d].children && this.data.MenuItem[d].children!.length) {
                for(let e=0; c<this.data.MenuItem[d].children!.length; e++){
                    if (this.data.MenuItem[d].children[e]._id== this.menuItems[b].children![c]._id){
                       // console.log('for children:',this.data.MenuItem[d].children[e]);
                       this.menuItems[b].children![c].selected=this.data.MenuItem[d].children[e].selected
                       this.menuItems[b].children![c].tipoPermiso=this.data.MenuItem[d].children[e].tipoPermiso
                        flag=1
                        break
                    }
                }
                if (flag==1){
                  break
                }
              }
            }


          }
        }else{
          this.menuItemsResultadoFiltro=this.data.MenuItem!.filter((item: any) => item._id === this.menuItems[b]._id)
          this.menuItems[b].selected=this.menuItemsResultadoFiltro[0].selected
          this.menuItems[b].tipoPermiso=this.menuItemsResultadoFiltro[0].tipoPermiso

          /*if (this.menuItems[a].codigoServicio.toUpperCase() === this.menuItems[b].route.toUpperCase().replace("/0","").replace("/1","")){
            this.fillerNav[b].disabled=false;
          }*/
        }
      }
      console.log('base:', this.menuItems);
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
        error,
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
    this.menuItemsResultado=JSON.parse(JSON.stringify(this.menuItemsResultado, getCircularReplacer())); // Permite pasar estructura al modelo

    this.datoUsuarioEmpresa = {
      empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,
      rutEmpresa: this.currentUsuario.usuarioDato.empresa.rutEmpresa
    }



    this.datoUsuario = {
      _id:this.data._id,
      rutUsuario: this.agregaUsuario.get('rutUsuario')!.value.toUpperCase(),
      nombres: this.agregaUsuario.get('nombres')!.value.toUpperCase(),
      apellidoPaterno: this.agregaUsuario.get('apellidoPaterno')!.value.toUpperCase(),
      apellidoMaterno: this.agregaUsuario.get('apellidoMaterno')!.value.toUpperCase(),
      empresa: this.datoUsuarioEmpresa,
      telefono: this.agregaUsuario.get('telefono')!.value,
      email: this.agregaUsuario.get('email')!.value.toUpperCase(),
      direccion: this.agregaUsuario.get('direccion')!.value.toUpperCase(),
      estadoUsuario: this.agregaUsuario.get('estadoUsuario')!.value,
      MenuItem: this.menuItemsResultado,
      usuarioCrea_id: this.currentUsuario.usuarioDato.usuario,
      usuarioModifica_id: this.currentUsuario.usuarioDato.usuario

    };

    this.usuarioLabService.putDataUsuario(this.datoUsuario)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
              Swal.fire(
              'Se Actualizó con Éxito',
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



  comparaEstadoUsuario(v1: any, v2: any): boolean {
    return  v1.toUpperCase()===v2.toUpperCase();
  }

}

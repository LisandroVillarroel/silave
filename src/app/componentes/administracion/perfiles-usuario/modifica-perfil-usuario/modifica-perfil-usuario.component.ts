
import { IUsuario, IUsuarioEmpresa } from '@app/modelo/usuario-interface';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { Component, Inject, OnInit } from "@angular/core";

import { JwtResponseI } from "@app/autentica/_models";
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

  selectTipoUsuario = [{ value: 'Administrador', nombre: 'Administrador'}, { value: 'Laboratorio', nombre: 'Laboratorio'}, { value: 'Cliente', nombre: 'Cliente'}];
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

  //selectTipoEmpresa: { menu_Id: string, nombre: string} []=[];
  //PnombreTipoEmpresa!: string;
  Pmenu_Id!: string;

  constructor(private dialogRef: MatDialogRef<ModificaPerfilUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuService:MenuService,
    private usuarioLabService: UsuarioLabService,
    private authenticationService:AuthenticationService,
    private _formBuilder: FormBuilder) {

      this.datoUsuarioPar = data;
      this.Pmenu_Id= data.empresa.menu_Id;
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
    console.log('data inicial:',data);
   // this.getDataMenuTipoEmpresa();
    this.getDataMenu(data.empresa.menu_Id);

  }


  rutUsuario = new FormControl(this.data.rutUsuario, [Validators.required, this.validaRut]);

  nombres = new FormControl(this.data.nombres, [Validators.required]);
  apellidoPaterno = new FormControl(this.data.apellidoPaterno, [Validators.required]);
  apellidoMaterno = new FormControl(this.data.apellidoMaterno, [Validators.required]);
  email = new FormControl(this.data.email, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  telefono = new FormControl(this.data.telefono, [Validators.required]);
  direccion = new FormControl(this.data.direccion, [Validators.required]);
  estadoUsuario = new FormControl(this.data.estadoUsuario, [Validators.required]);
  //tipoEmpresa = new FormControl(this.data.empresa.tipoEmpresa, [Validators.required]);

  agregaUsuario = this._formBuilder.group({

    rutUsuario: this.rutUsuario,
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    email: this.email,
    telefono: this.telefono,
    direccion: this.direccion,
    estadoUsuario: this.estadoUsuario
    //tipoEmpresa: this.tipoEmpresa

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
   /* if (campo === 'tipoEmpresa'){
      return this.tipoEmpresa.hasError('required') ? 'Debes ingresar Tipo Empresa' : '';
    }
    */
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
    console.log('node 1:',node);
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every(child => child.selected);
  //    node.parent.tipoPermiso = descendants.every(child => child.tipoPermiso);
      node.parent.indeterminate = descendants.some(child => child.selected);
      this.checkAllParents(node.parent);
    }
    /*else{
      const descendants = this.treeControl.getDescendants(node);
      node.selected = descendants.every(child => child.selected);
    //  node.tipoPermiso = descendants.every(child => child.tipoPermiso);
      node.indeterminate = descendants.some(child => child.selected);
    }
    */
    console.log('node 2:',node);
  }

  todoItemSelectionToggle(checked: any, node: { selected: any; children: any[]; }) {

    node.selected = checked;

    console.log('selected2:',node.selected)
    console.log('selected2.1:',node)
    if (node.children) {
      node.children.forEach(x => {
        this.todoItemSelectionToggle(checked, x);
      });
    }
    console.log('selected2.3:',node.selected)
    console.log('selected3:',node)
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
  /*
  getDataMenuTipoEmpresa(){

    this.menuService
    .getDataMenuTodo()
    .subscribe(res => {
      console.log('res:',res.data);
      for(let a=0; a<res.data.length; a++){
        if (res.data[a].nombreMenu!='Administrador General' || this.currentUsuario.usuarioDato.empresa.tipoEmpresa=='Administrador General' )
        {
          var arreglo={"value":res.data[a]._id, "nombre":res.data[a].nombreMenu};
          console.log('arreglo:',arreglo);

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
*/
  getDataMenuEmpresa(P_menu_Id: string){
    console.log('id menu usuario:',P_menu_Id);
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


  getDataMenu(P_menu_Id:string){
    let flag=0;

    console.log('menu id:',P_menu_Id);
    this.menuService
    .getDataMenu(P_menu_Id)
    .subscribe(res => {
      console.log('menu origen',res.data[0]);
      this.menuItems=res.data[0].MenuItem;
      //this.flag=true;
      console.log('paso data ',this.data.MenuItem);
      console.log('paso rescata',res.data[0].MenuItem);
      if (this.data.MenuItem.length!=0)
      {
        for(let b=0; b<this.menuItems.length; b++){
          if (this.menuItems[b].children && this.menuItems[b].children!.length) {
            for(let c=0; c<this.menuItems[b].children!.length; c++){
              flag=0;
              for(let d=0; d<this.data.MenuItem.length; d++){
                if (this.data.MenuItem[d].children && this.data.MenuItem[d].children!.length) {
                  for(let e=0; e<this.data.MenuItem[d].children!.length; e++){
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
            console.log('busca:',this.menuItems[b]._id);
            this.menuItemsResultadoFiltro=this.data.MenuItem!.filter((item: any) => item._id === this.menuItems[b]._id)
            console.log('encontro:',this.menuItemsResultadoFiltro);
            console.log('cantidad:',this.menuItemsResultadoFiltro.length)
            if (this.menuItemsResultadoFiltro.length!=0){
              this.menuItems[b].selected=this.menuItemsResultadoFiltro[0].selected
              this.menuItems[b].tipoPermiso=this.menuItemsResultadoFiltro[0].tipoPermiso
            }else{
             // this.menuItems[b].selected=false
            }
            /*if (this.menuItems[a].codigoServicio.toUpperCase() === this.menuItems[b].route.toUpperCase().replace("/0","").replace("/1","")){
              this.fillerNav[b].disabled=false;
            }*/
          }
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
    console.log('resultado 1',this.dataSource.data);
    await this.dataSource.data.forEach(node => {
      result = result.concat(
        this.treeControl
          .getDescendants(node)
        //  .filter(x => x.selected && x._id)
        //  .map(x => x._id)
      );

    });


    console.log('resultado 2',this.dataSource.data);
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
    console.log('resultado 3',this.menuItemsResultado);
    this.menuItemsResultado=JSON.parse(JSON.stringify(this.menuItemsResultado, getCircularReplacer())); // Permite pasar estructura al modelo
    console.log('resultado 4:',this.menuItemsResultado)
   // await this.marcaSelectedSeleccionado()
   // console.log('resultado 6:',this.menuItemsResultado)
   /* this.datoUsuarioEmpresa = {
      empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,
      rutEmpresa: this.currentUsuario.usuarioDato.empresa.rutEmpresa,
      menu_Id: this.Pmenu_Id,
      tipoEmpresa:  this.agregaUsuario.get('tipoEmpresa')!.value,
    }
*/


    this.datoUsuario = {
      _id:this.data._id,
      rutUsuario: this.agregaUsuario.get('rutUsuario')!.value.toUpperCase(),
      nombres: this.agregaUsuario.get('nombres')!.value,
      apellidoPaterno: this.agregaUsuario.get('apellidoPaterno')!.value,
      apellidoMaterno: this.agregaUsuario.get('apellidoMaterno')!.value,
      empresa: this.datoUsuarioEmpresa,
      telefono: this.agregaUsuario.get('telefono')!.value,
      email: this.agregaUsuario.get('email')!.value,
      direccion: this.agregaUsuario.get('direccion')!.value,
      estadoUsuario: this.agregaUsuario.get('estadoUsuario')!.value,
      MenuItem: this.menuItemsResultado,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id

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

  marcaSelectedSeleccionado(){
    console.log('paso cambia')
    for(let b=0; b<this.menuItemsResultado.length; b++){
      this.menuItemsResultado[b].selected=this.menuItemsResultado[b].indeterminate;
      if (this.menuItemsResultado[b].children && this.menuItemsResultado[b].children!.length) {
        for(let c=0; c<this.menuItemsResultado[b].children!.length; c++){

              this.menuItemsResultado[c].selected=this.menuItemsResultado[c].indeterminate;
        }
      }
    }
  }

 /* seleccionaTipoEmpresa(p:any){
    console.log('p:',p)
    this.PnombreTipoEmpresa=p.nombre;
    this.Pmenu_Id=p.menu_Id;
    this.getDataMenuEmpresa(p.menu_Id);
     return;
   }
*/

  comparaEstadoUsuario(v1: any, v2: any): boolean {
    return  v1.toUpperCase()===v2.toUpperCase();
  }

  comparaTipoEmpresa(v1: any, v2: any): boolean {
    console.log('v1:',v1.nombre);
    console.log('v2:',v2);
    return  v1.nombre.toUpperCase()===v2.toUpperCase();
  }

}

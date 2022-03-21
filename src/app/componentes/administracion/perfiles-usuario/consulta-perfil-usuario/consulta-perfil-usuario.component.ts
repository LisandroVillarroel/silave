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
  selector: 'app-consulta-perfil-usuario',
  templateUrl: './consulta-perfil-usuario.component.html',
  styleUrls: ['./consulta-perfil-usuario.component.css']
})

export class ConsultaPerfilUsuarioComponent implements  OnInit  {


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

  constructor(private dialogRef: MatDialogRef<ConsultaPerfilUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuService:MenuService,
    private usuarioLabService: UsuarioLabService,
    private authenticationService:AuthenticationService,
    private _formBuilder: FormBuilder) {

      this.datoUsuarioPar = data;
      console.log('data:',this.datoUsuarioPar);
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

  /*Fin tree*/

  getDataMenu(){
    let flag=0;

    this.menuService
    .getDataMenu(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {
      this.menuItems=res.data[0].MenuItem;
      //this.flag=true;
      for(let b=0; b<this.menuItems.length; b++){
        if (this.menuItems[b].children && this.menuItems[b].children!.length) {
          for(let c=0; c<this.menuItems[b].children!.length; c++){
            flag=0;
            for(let d=0; d<this.data.MenuItem.length; d++){
              if (this.data.MenuItem[d].children && this.data.MenuItem[d].children!.length) {
                for(let e=0; c<this.data.MenuItem[d].children!.length; e++){
                    if (this.data.MenuItem[d].children[e]._id== this.menuItems[b].children![c]._id){

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


}

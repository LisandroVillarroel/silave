import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { MenuItem } from '@app/modelo/menu-interface';
import { IUsuario, IUsuarioCliente, IUsuarioEmpresa } from '@app/modelo/usuario-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import { MenuService } from '@app/servicios/menu.service';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega-usuarios-empresa',
  templateUrl: './agrega-usuarios-empresa.component.html',
  styleUrls: ['./agrega-usuarios-empresa.component.css']
})
export class AgregaUsuariosEmpresaComponent implements OnInit {

  selectTipoPermiso = [{ value: 'Administrador', nombre: 'Administrador'}, { value: 'Básico', nombre: 'Básico'}];


  tipoPermiso = new UntypedFormControl('', Validators.required);

  currentUsuario!: JwtResponseI;

  menuItems!: MenuItem[];
  menuItemsResultado!: MenuItem[];
  menuItemsResultado2!: MenuItem[];

  datoUsuario!: IUsuario;
  datoUsuarioEmpresa!: IUsuarioEmpresa;
  datoEmpresa!: IEmpresa[];
  datoUsuarioCliente!: IUsuarioCliente;
  /*tree*/
  treeControl = new NestedTreeControl<MenuItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuItem>();
  /*fin tree*/

  P_empresa_Id!: string;
  P_rutEmpresa!: string;
  P_menu_Id!: string;
  P_tipoEmpresa!: string;

  secondFormGroup!: UntypedFormGroup;

  constructor(private dialogRef: MatDialogRef<AgregaUsuariosEmpresaComponent>,
    private menuService:MenuService,
    private usuarioLabService: UsuarioLabService,
    private empresaService: EmpresaService,
    private authenticationService:AuthenticationService,
    private _formBuilder: UntypedFormBuilder) {



    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }

    this.cargaEmpresa();
  }

  validarQueSeanIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('contrasena');
    const confirmarPassword = control.get('contrasena2');

    return password?.value === confirmarPassword?.value ? null : { 'noSonIguales': true };
  };


  empresa = new UntypedFormControl('', [Validators.required]);
  usuario = new UntypedFormControl('', [Validators.required]);
  contrasena = new UntypedFormControl('', [Validators.required]);
  contrasena2 = new UntypedFormControl('', [Validators.required]);
  rutUsuario = new UntypedFormControl('', [Validators.required, this.validaRut]);

  nombres = new UntypedFormControl('', [Validators.required]);
  apellidoPaterno = new UntypedFormControl('', [Validators.required]);
  apellidoMaterno = new UntypedFormControl('', [Validators.required]);
  email = new UntypedFormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  telefono = new UntypedFormControl('', [Validators.required]);
  direccion = new UntypedFormControl('', [Validators.required]);


  agregaUsuario = this._formBuilder.group({
    empresa: this.empresa,
    usuario: this.usuario,
    contrasena: this.contrasena,
    contrasena2: this.contrasena2,
    rutUsuario: this.rutUsuario,
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    email: this.email,
    telefono: this.telefono,
    direccion: this.direccion
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
    if (campo === 'empresa'){
      return this.empresa.hasError('required') ? 'Debes ingresar Empresa'  : '';
    }
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

  getDataMenu(P_menu_Id: string){
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




  validaRut(control: UntypedFormControl): {[s: string]: boolean} {
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


  cargaEmpresa(){
    this.empresaService
    .getDataEmpresaTodo()
    .subscribe(res => {
      console.log('empresa:', res['data'])
      this.datoEmpresa = res['data'] ;
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

  async seleccionaEmpresa(p: any){
   // this.cargaClienteDoctorSolicitante(p._id)

    this.P_empresa_Id= p._id;
    this.P_rutEmpresa= p.rutEmpresa;
    this.P_menu_Id= p.menu_Id;
    this.P_tipoEmpresa=p.tipoEmpresa;

     await this.getDataMenu(p.menu_Id);
     return;
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
    this.menuItemsResultado=await JSON.parse(JSON.stringify(this.menuItemsResultado, getCircularReplacer())); // Permite pasar estructura al modelo

    //Permite marcar las cabeceras que se modificaron
    for(let d=0; d<this.menuItemsResultado.length; d++){  // Recorre Usuario
      for(let e=0; e<this.menuItemsResultado[d].children!.length; e++){//Recorre Usuario Hijo
          if (this.menuItemsResultado[d].children![e].selected== true){
              this.menuItemsResultado[d].selected=true;
              break
          }
      }
    }

    console.log('paso agrega 1')
    await this.marcaInicioChildren();
    console.log('paso agrega 3')
    this.datoUsuarioEmpresa = {
      empresa_Id:this.P_empresa_Id,
      rutEmpresa: this.P_rutEmpresa,
      menu_Id: this.P_menu_Id,
      tipoEmpresa: this.P_tipoEmpresa
    }

    this.datoUsuarioCliente = {
      idCliente:'',
      nombreFantasia:''
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
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id

    };
    console.log('dato usu:',this.datoUsuario);
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

}

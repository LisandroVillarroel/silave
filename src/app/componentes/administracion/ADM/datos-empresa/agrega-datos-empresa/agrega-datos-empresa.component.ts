import { strings } from '@angular-devkit/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmail, IEmpresa } from '@app/modelo/empresa-interface';
import { IEspecie } from '@app/modelo/especie-interface';
import { IExamen } from '@app/modelo/examen-interface';
import { IParametro } from '@app/modelo/parametro-interface';
import { IRaza } from '@app/modelo/raza-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import { EspecieService } from '@app/servicios/especie.service';
import { ExamenService } from '@app/servicios/examen.service';
import { ImagenesService } from '@app/servicios/imagenes.service';
import { MenuService } from '@app/servicios/menu.service';
import { ParametroService } from '@app/servicios/parametro.service';
import { RazaService } from '@app/servicios/raza.service';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { FileHolder } from 'angular2-image-upload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrega-datos-empresa',
  templateUrl: './agrega-datos-empresa.component.html',
  styleUrls: ['./agrega-datos-empresa.component.css']
})
export class AgregaDatosEmpresaComponent implements OnInit {

  //selectTipoEmpresa = [{ value: 'Administrador', nombre: 'Administrador'}, { value: 'Laboratorio', nombre: 'Laboratorio'}, { value: 'Cliente', nombre: 'Cliente'}];
  selectTipoEmpresa: { menu_Id: string, nombre: string} []=[];
  datoEmpresa!: IEmpresa;
  datoEnviaEmpresa!: IEmpresa;
  datoEnviaCorreo!: IEmail;
  currentUsuario!: JwtResponseI;
  datoExamen!: IExamen[];
  datoRaza!: IRaza[];
  datoEspecie!: IEspecie[];

  datoExamenRegistro!: IExamen;
  datoRazaRegistro!: IRaza[];
  datoRazaRegistro_2!: IRaza;

  datoEspecieRegistro!: IEspecie;
  datoParametroRegistro!:IParametro;

  nombreTipoEmpresa:string='';
  menu_IdTipoEmpresa:string='';

  imagen64: any;

  imagen = './../../../../../assets/imagenes/';
  archivo: {
    nombre: string,
    nombreArchivo: string,
    base64textString: string,
    ruta: string
  } = {
    nombre:'',
    nombreArchivo: '',
    base64textString: '',
    ruta:''
  };

  constructor(private dialogRef: MatDialogRef<AgregaDatosEmpresaComponent>,
              private authenticationService:AuthenticationService,
              private empresaService: EmpresaService,
              private examenService: ExamenService,
              private menuService: MenuService,
              private parametroService: ParametroService,
              private razaService: RazaService,
              private especieService: EspecieService,
              private imagenesService:ImagenesService) {


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
    this.cargaEmpresa();
    this.getDataMenu();
  }

  rutEmpresa = new FormControl('', [Validators.required, this.validaRut]);
  razonSocial = new FormControl('', [Validators.required]);
  nombreFantasia = new FormControl('', [Validators.required]);
  direccion = new FormControl('', [Validators.required]);
  nombreContacto = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  tipoEmpresa = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  correoRecepcionSolicitud=new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  emailEnvio = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  password = new FormControl('', [Validators.required]);
  nombreDesde = new FormControl('', [Validators.required]);
  asunto = new FormControl('', [Validators.required]);
  tituloCuerpo = new FormControl('', [Validators.required]);
  tituloCuerpoMedio = new FormControl('', [Validators.required]);
  tituloCuerpoPie = new FormControl('', [Validators.required]);
  numeroFicha = new FormControl('', [Validators.required]);
  letraFicha = new FormControl('', [Validators.required]);

  agregaEmpresa : FormGroup = new FormGroup({
    rutEmpresa: this.rutEmpresa,
    razonSocial: this.razonSocial,
    nombreFantasia: this.nombreFantasia,
    direccion: this.direccion,
    nombreContacto: this.nombreContacto,
    telefono: this.telefono,
    tipoEmpresa: this.tipoEmpresa,
    email: this.email,
    correoRecepcionSolicitud: this.correoRecepcionSolicitud,
    emailEnvio: this.emailEnvio,
    password: this.password,
    nombreDesde: this.nombreDesde,
    asunto: this.asunto,
    tituloCuerpo: this.tituloCuerpo,
    tituloCuerpoMedio: this.tituloCuerpoMedio,
    tituloCuerpoPie: this.tituloCuerpoPie,
    numeroFicha: this.numeroFicha,
    letraFicha: this.letraFicha
    // address: this.addressFormControl
  });


  getErrorMessage(campo: string){

    if (campo === 'rutEmpresa'){
      return this.rutEmpresa.hasError('required') ? 'Debes ingresar Rut' :
      this.rutEmpresa.hasError('rutInvalido') ? 'Rut Inválido' : '';
    }
    if (campo === 'razonSocial'){
        return this.razonSocial.hasError('required') ? 'Debes ingresar Razon Social' :'';
    }
    if (campo === 'nombreFantasia'){
        return this.nombreFantasia.hasError('required') ? 'Debes ingresar Nombre Fantasía'  : '';
    }
    if (campo === 'direccion'){
        return this.direccion.hasError('required') ? 'Debes ingresar Direccion' : '';
    }
    if (campo === 'nombreContacto'){
      return this.nombreContacto.hasError('required') ? 'Debes ingresar Nombre Contacto' : '';
    }
    if (campo === 'telefono'){
        return this.telefono.hasError('required') ? 'Debes ingresar telefono' : '';
    }
    if (campo === 'email'){
      return this.email.hasError('required') ? 'Debes ingresar Email' : '';
    }
    if (campo === 'emailEnvio'){
      return this.emailEnvio.hasError('required') ? 'Debes ingresar Email Envio' : '';
    }
    if (campo === 'correoRecepcionSolicitud'){
      return this.correoRecepcionSolicitud.hasError('required') ? 'Debes ingresar Email Recepción Solicitud' : '';
    }
    if (campo === 'password'){
      return this.password.hasError('required') ? 'Debes ingresar Password' : '';
    }
    if (campo === 'nombreDesde'){
      return this.nombreDesde.hasError('required') ? 'Debes ingresar Nombre Desde' : '';
    }
    if (campo === 'asunto'){
      return this.asunto.hasError('required') ? 'Debes ingresar Asunto' : '';
    }
    if (campo === 'tituloCuerpo'){
      return this.tituloCuerpo.hasError('required') ? 'Debes ingresar Título Cuerpo' : '';
    }
    if (campo === 'tituloCuerpoMedio'){
      return this.tituloCuerpoMedio.hasError('required') ? 'Debes ingresar Título Cuerpo Medio' : '';
    }
    if (campo === 'tituloCuerpoPie'){
      return this.tituloCuerpoPie.hasError('required') ? 'Debes ingresar título Cuerpo Pie' : '';
    }
    if (campo === 'numeroFicha'){
      return this.numeroFicha.hasError('required') ? 'Debes ingresar número Ficha' : '';
    }
    if (campo === 'letraFicha'){
      return this.letraFicha.hasError('required') ? 'Debes ingresar letra Ficha' : '';
    }
    return '';
  }

  ngOnInit() {
    this.cargaExamen();
    this.cargaEspecie();
    this.cargaRaza();
    this.cargaRaza();
  }


  getDataMenu(){

    this.menuService
    .getDataMenuTodo()
    .subscribe(res => {
      console.log('res:',res.data);
      for(let a=0; a<res.data.length; a++){

        var arreglo={"value":res.data[a]._id, "nombre":res.data[a].nombreMenu};
        console.log('arreglo:',arreglo);
       /* this.selectTipoEmpresa[a].value=res.data[a]._id;
        this.selectTipoEmpresa[a].nombre=res.data[a].nombreMenu;*/
        this.selectTipoEmpresa.push({"menu_Id": res.data[a]._id, "nombre":res.data[a].nombreMenu});
        console.log('Tipo empresa:',this.selectTipoEmpresa);
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

  cargaExamen(){
    this.examenService
    .getDataExamenTodo(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {
      console.log('examen:', res['data'])
      this.datoExamen = res['data'] as any[];
    //  for (var x of this.datoExamen) {
     //   console.log(x)
     // }
    },
    // console.log('yo:', res as PerfilI[]),
    error => {
      console.log('error carga Examen:', error);
      Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
     );
    }
  ); // (this.dataSource.data = res as PerfilI[])
  }

  cargaRaza(){
    this.razaService
    .getDataRazaTodo(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {
      console.log('Raza:', res['data'])
      this.datoRaza = res['data'] as any[];
    //  for (var x of this.datoExamen) {
     //   console.log(x)
     // }
    },
    // console.log('yo:', res as PerfilI[]),
    error => {
      console.log('error carga Raza:', error);
      Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
     );
    }
  ); // (this.dataSource.data = res as PerfilI[])
  }

  cargaEspecie(){
    this.especieService
    .getDataEspecieTodo(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {
      console.log('especie:', res['data'])
      this.datoEspecie = res['data'] as any[];
    //  for (var x of this.datoExamen) {
     //   console.log(x)
     // }
    },
    // console.log('yo:', res as PerfilI[]),
    error => {
      console.log('error carga Especie:', error);
      Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
     );
    }
  ); // (this.dataSource.data = res as PerfilI[])
  }

    cargaEmpresa(){
      this.empresaService
      .getDataEmpresa(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('cliente:', res['data'])
        this.datoEmpresa = res['data'] ;
      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga empresa:', error);
       Swal.fire(
        'ERROR INESPERADO',
        error,
       'error'
      );
      }
    ); // (this.dataSource.data = res as PerfilI[])
    }


  async enviar(){

    if (this.archivo.nombreArchivo==''){
      this.archivo.nombreArchivo='sinLogo.jpg';
    }

    this.datoEnviaCorreo={
      emailEnvio: this.agregaEmpresa.get('emailEnvio')!.value,
      password: this.agregaEmpresa.get('password')!.value,
      nombreDesde: this.agregaEmpresa.get('nombreDesde')!.value,
      asunto: this.agregaEmpresa.get('asunto')!.value,
      tituloCuerpo: this.agregaEmpresa.get('tituloCuerpo')!.value,
      tituloCuerpoMedio: this.agregaEmpresa.get('tituloCuerpoMedio')!.value,
      tituloCuerpoPie: this.agregaEmpresa.get('tituloCuerpoPie')!.value
    }

    this.datoEnviaEmpresa = {
      rutEmpresa: this.agregaEmpresa.get('rutEmpresa')!.value.toUpperCase(),
      razonSocial: this.agregaEmpresa.get('razonSocial')!.value,
      nombreFantasia: this.agregaEmpresa.get('nombreFantasia')!.value,
      direccion: this.agregaEmpresa.get('direccion')!.value,
      nombreContacto: this.agregaEmpresa.get('nombreContacto')!.value,
      telefono: this.agregaEmpresa.get('telefono')!.value,
      tipoEmpresa: this.nombreTipoEmpresa,
      menu_Id: this.menu_IdTipoEmpresa,
      email: this.agregaEmpresa.get('email')!.value,
      correoRecepcionSolicitud: this.agregaEmpresa.get('correoRecepcionSolicitud')!.value,
      envioEmail: this.datoEnviaCorreo,
      nombreLogo:this.archivo.nombreArchivo,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    this.empresaService.postDataEmpresa(this.datoEnviaEmpresa)
      .subscribe(
        dato => {
          console.log('paso1:',dato);
          let resultadoEmpresa:any;

          if (dato.codigo === 200) {
            console.log('paso2:',dato);
            resultadoEmpresa=dato;

            this.archivo.ruta=this.agregaEmpresa.get('rutEmpresa')!.value.toUpperCase();

            let letra= this.agregaEmpresa.get('letraFicha')!.value.toUpperCase();

            this.parametroService.getDataParametroLetra(letra)
              .subscribe(
                dato => {
                  console.log('paso1 parametro:',dato);
                  console.log('largo:',dato.data.length);
                  if (dato.codigo === 200) {
                    if(dato.data.length===0){
                      this.grabaTablas(resultadoEmpresa);
                    }else{
                      Swal.fire(
                        'PARÁMETRO FICHA',
                        'Letra Ya Existe',
                        'error'
                      );
                    }

                  }
                }
              )


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


  grabaTablas(dato:any){
    this.agregaExamenesPreDefinidos(dato);
    this.agregaEspeciePreDefinidos(dato);
    this.agregaRazaPreDefinidos(dato);

    this.agregaParametros(dato);

    if (this.archivo.nombreArchivo!=='sinLogo.jpg'){
       this.agregaLogoEmpresa();
    }

    Swal.fire(
      'Se agregó con Éxito',
      'Click en Boton!',
      'success'
    ); // ,
    this.dialogRef.close(1);
  }


  async agregaExamenesPreDefinidos(datoEmpresa:any){
    console.log('paso3:',this.datoExamen);
    for(let a=0; a<this.datoExamen.length; a++){
      console.log('paso4');
      this.datoExamenRegistro = {
        codigoExamen: this.datoExamen[a].codigoExamen,
        codigoInterno: this.datoExamen[a].codigoInterno,
        nombre: this.datoExamen[a].nombre,
        sigla: this.datoExamen[a].sigla,
        precio: this.datoExamen[a].precio,
        nombreExamen: this.datoExamen[a].nombreExamen,
        usuarioCrea_id: this.currentUsuario.usuarioDato._id,
        usuarioModifica_id: this.currentUsuario.usuarioDato._id,
        empresa_Id: datoEmpresa.data._id
      };
      await this.examenService.postDataExamen(this.datoExamenRegistro)
      .subscribe(
        dato => {
          console.log('respuesta:', dato);
          if (dato.codigo != 200) {

            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Exámen:', dato);
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
  }

  async agregaRazaPreDefinidos(datoEmpresa:any){
    console.log('paso3:',this.datoRaza);
    this.datoRazaRegistro=this.datoRaza;
   // this.datoRazaRegistro.updateMany({},{$unset:{"especie":""}})
    for(let a=0; a<this.datoRaza.length; a++){

        this.datoRazaRegistro[a].usuarioCrea_id= this.currentUsuario.usuarioDato._id;
        this.datoRazaRegistro[a].usuarioModifica_id= this.currentUsuario.usuarioDato._id;
        this.datoRazaRegistro[a].empresa_Id= datoEmpresa.data._id;

     console.log('datos raza',this.datoRazaRegistro);
    }
    this.grabaRaza(this.datoRazaRegistro)
  }


  grabaRaza(datoRazaRegistro_:IRaza[]){
     this.razaService.postDataRazaMasiva(datoRazaRegistro_)
      .subscribe(
        dato => {
          console.log('respuesta:', dato);
          if (dato.codigo != 200) {

            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Raza:', dato);
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

  async agregaEspeciePreDefinidos(datoEmpresa:any){
    console.log('paso3:',this.datoEspecie);
    for(let a=0; a<this.datoEspecie.length; a++){
      console.log('paso4');
      this.datoEspecieRegistro = {
        nombre: this.datoEspecie[a].nombre,
        usuarioCrea_id: this.currentUsuario.usuarioDato._id,
        usuarioModifica_id: this.currentUsuario.usuarioDato._id,
        empresa_Id: datoEmpresa.data._id
      };
      await this.especieService.postDataEspecie(this.datoEspecieRegistro)
      .subscribe(
        dato => {
          console.log('respuesta:', dato);
          if (dato.codigo != 200) {

            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Especie:', dato);
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
  }

  async agregaParametros(datoEmpresa:any){
    console.log('paso3:',this.datoExamen);

      this.datoParametroRegistro = {
        empresa_id: datoEmpresa.data._id,
        letra: this.agregaEmpresa.get('letraFicha')!.value.toUpperCase(),
        numeroFicha: this.agregaEmpresa.get('numeroFicha')!.value,
        usuarioCrea_id: this.currentUsuario.usuarioDato._id,
        usuarioModifica_id: this.currentUsuario.usuarioDato._id
      };
      await this.parametroService.postDataParametro(this.datoParametroRegistro)
      .subscribe(
        dato => {
          console.log('respuesta:', dato);
          if (dato.codigo != 200) {

            if (dato.codigo!=500){
              Swal.fire(
                dato.mensaje,
                '',
                'error'
              );
            }
            else{
              console.log('Error Parámetro:', dato);
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

  agregaLogoEmpresa(){
    this.imagenesService.uploadFile(this.archivo)
    .subscribe({
      next: (datos) => {
        console.log('antes de grabar imagen:',datos);
        if(datos.resultado === 'OK') {
          console.log('grabó imagen');
        }
      },
      error: (error) => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
        'error'
      );
      }
  })
  }

  seleccionaTipoEmpresa(p:any){
    console.log('p:',p);
    console.log('p.nombre:',p.nombre)
   this.nombreTipoEmpresa=p.nombre;
   this.menu_IdTipoEmpresa=p.menu_Id;
    return;
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
      this.agregaEmpresa.get('rutEmpresa')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
    }
  }

  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    console.log('extensión:',file.src.split(';')[0].split('/')[1]);
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;

    this.archivo.nombreArchivo='logo.'+file.src.split(';')[0].split('/')[1];
    //this.archivo.ruta=this.currentUsuario.usuarioDato.empresa.rutEmpresa;
  }

  onRemoved(file: FileHolder) {
    console.log('paso2: ', file);
    this.imagen64= '';
    this.archivo.base64textString='';
    this.archivo.nombreArchivo='';
    this.archivo.ruta='';
  }

  onUploadStateChanged(state: boolean) {
    console.log('paso3: ', state);
  }

  comparaEstadoUsuario(v1: any, v2: any): boolean {
    return  v1.toUpperCase()===v2.toUpperCase();
  }
}

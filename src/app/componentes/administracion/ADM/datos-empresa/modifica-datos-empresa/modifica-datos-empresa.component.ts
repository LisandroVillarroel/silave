import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmail, IEmpresa } from '@app/modelo/empresa-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import { ImagenesService } from '@app/servicios/imagenes.service';
import { MenuService } from '@app/servicios/menu.service';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { FileHolder } from 'angular2-image-upload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-datos-empresa',
  templateUrl: './modifica-datos-empresa.component.html',
  styleUrls: ['./modifica-datos-empresa.component.css']
})
export class ModificaDatosEmpresaComponent implements OnInit {

  selectTipoEmpresa: { menu_Id: string, nombre: string} []=[];
  datoEmpresa!: IEmpresa;
  datoEnviaEmpresa!: IEmpresa;
  datoEnviaCorreo!: IEmail;
  currentUsuario!: JwtResponseI;
  nombreTipoEmpresa: string ='';
  menu_IdTipoEmpresa: string ='';

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

  constructor(private dialogRef: MatDialogRef<ModificaDatosEmpresaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authenticationService:AuthenticationService,
              private menuService: MenuService,
              private empresaService: EmpresaService,
              private imagenesService: ImagenesService) {

                this.nombreTipoEmpresa=data.tipoEmpresa;
                this.menu_IdTipoEmpresa=data.menu_Id;


    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    console.log('datos empresa:', data);

    console.log('logo:',data?.nombreLogo);
    if (data?.nombreLogo == undefined || data?.nombreLogo=='' || data?.nombreLogo=='sinLogo.jpg') {
       this.imagen=this.imagen+'sinLogo.jpg';
    }else{
       this.imagen=this.imagen+ data.rutEmpresa+'/'+data?.nombreLogo  // agregar a estructura data.nomreArchivo
    }
    console.log('imegen:',this.imagen)
  }

  razonSocial = new FormControl(this.data.razonSocial, [Validators.required]);
  nombreFantasia = new FormControl(this.data.nombreFantasia, [Validators.required]);
  direccion = new FormControl(this.data.direccion, [Validators.required]);
  nombreContacto = new FormControl(this.data.nombreContacto, [Validators.required]);
  telefono = new FormControl(this.data.telefono, [Validators.required]);
  tipoEmpresa = new FormControl(this.data.menu_Id, [Validators.required]);
  email = new FormControl(this.data.email, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  correoRecepcionSolicitud = new FormControl(this.data.correoRecepcionSolicitud, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  emailEnvio = new FormControl(this.data.envioEmail?.emailEnvio, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  password = new FormControl(this.data.envioEmail?.password, [Validators.required]);
  nombreDesde = new FormControl(this.data.envioEmail?.nombreDesde, [Validators.required]);
  asunto = new FormControl(this.data.envioEmail?.asunto, [Validators.required]);
  tituloCuerpo = new FormControl(this.data.envioEmail?.tituloCuerpo, [Validators.required]);
  tituloCuerpoMedio = new FormControl(this.data.envioEmail?.tituloCuerpoMedio, [Validators.required]);
  tituloCuerpoPie = new FormControl(this.data.envioEmail?.tituloCuerpoPie, [Validators.required]);

  modificaEmpresa : FormGroup = new FormGroup({
    razonSocial: this.razonSocial,
    nombreFantasia: this.nombreFantasia,
    direccion: this.direccion,
    nombreContacto: this.nombreContacto,
    telefono: this.telefono,
    tipoEmprsa: this.tipoEmpresa,
    email: this.email,
    correoRecepcionSolicitud: this.correoRecepcionSolicitud,
    emailEnvio: this.emailEnvio,
    password: this.password,
    nombreDesde: this.nombreDesde,
    asunto: this.asunto,
    tituloCuerpo: this.tituloCuerpo,
    tituloCuerpoMedio: this.tituloCuerpoMedio,
    tituloCuerpoPie: this.tituloCuerpoPie
    // address: this.addressFormControl
  });


  getErrorMessage(campo: string){


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
    if (campo === 'correoRecepcionSolicitud'){
      return this.correoRecepcionSolicitud.hasError('required') ? 'Debes ingresar Recepción Email Solicitud' : '';
    }
    if (campo === 'emailEnvio'){
      return this.emailEnvio.hasError('required') ? 'Debes ingresar Email Envio' : '';
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
      return this.tituloCuerpoPie.hasError('required') ? 'Debes ingresar tituloCuerpoPie' : '';
    }
    return '';
  }

  ngOnInit() {
    this.getDataMenu();
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


  async enviar(){

    if (this.archivo.nombreArchivo=='' ){
      if (this.data?.nombreLogo=='sinLogo.jpg'){
          this.archivo.nombreArchivo='sinLogo.jpg';
      }else{
        this.archivo.nombreArchivo=this.data?.nombreLogo;
      }
    }

    this.datoEnviaCorreo={
      emailEnvio: this.modificaEmpresa.get('emailEnvio')!.value,
      password: this.modificaEmpresa.get('password')!.value,
      nombreDesde: this.modificaEmpresa.get('nombreDesde')!.value,
      asunto: this.modificaEmpresa.get('asunto')!.value,
      tituloCuerpo: this.modificaEmpresa.get('tituloCuerpo')!.value,
      tituloCuerpoMedio: this.modificaEmpresa.get('tituloCuerpoMedio')!.value,
      tituloCuerpoPie: this.modificaEmpresa.get('tituloCuerpoPie')!.value
    }

console.log('nombre empresa:',this.nombreTipoEmpresa);
console.log('id menu:',this.menu_IdTipoEmpresa);
    this.datoEnviaEmpresa = {
      _id:this.data._id,
      rutEmpresa: this.data.rutEmpresa.toUpperCase(),
      razonSocial: this.modificaEmpresa.get('razonSocial')!.value,
      nombreFantasia: this.modificaEmpresa.get('nombreFantasia')!.value,
      direccion: this.modificaEmpresa.get('direccion')!.value,
      nombreContacto: this.modificaEmpresa.get('nombreContacto')!.value,
      telefono: this.modificaEmpresa.get('telefono')!.value,
      tipoEmpresa: this.nombreTipoEmpresa,
      menu_Id: this.menu_IdTipoEmpresa,
      email: this.modificaEmpresa.get('email')!.value,
      correoRecepcionSolicitud: this.modificaEmpresa.get('correoRecepcionSolicitud')!.value,
      envioEmail: this.datoEnviaCorreo,
      nombreLogo:this.archivo.nombreArchivo,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    this.empresaService.putDataEmpresa(this.datoEnviaEmpresa)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
            if (this.archivo.nombreArchivo!=='sinLogo.jpg'){
              this.agregaLogoEmpresa();
           }
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


  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    console.log('extensión:',file.src.split(';')[0].split('/')[1]);
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;

    this.archivo.nombreArchivo='logo.'+file.src.split(';')[0].split('/')[1];
   this.archivo.ruta=this.data.rutEmpresa;
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

  comparaTipoEmpresa(v1: any, v2: any): boolean {
    console.log('v1:',v1);
    console.log('v2:',v2);
    return  v1.menu_Id===v2;
  }
}



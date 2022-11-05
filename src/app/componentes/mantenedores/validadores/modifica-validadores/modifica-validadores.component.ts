import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IValidador } from '@app/modelo/validador-interface';
import { ImagenesService } from '@app/servicios/imagenes.service';
import { MenuService } from '@app/servicios/menu.service';
import { ValidadorService } from '@app/servicios/validador.service';
import { formatRut, RutFormat, validateRut } from '@fdograph/rut-utilities';
import { FileHolder } from 'angular2-image-upload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-validadores',
  templateUrl: './modifica-validadores.component.html',
  styleUrls: ['./modifica-validadores.component.css']
})
export class ModificaValidadoresComponent implements OnInit {

  datoEnviaValidador!: IValidador;

  currentUsuario!: JwtResponseI;

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

  constructor(private dialogRef: MatDialogRef<ModificaValidadoresComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authenticationService:AuthenticationService,
              private validadorService: ValidadorService,
              private imagenesService: ImagenesService) {


    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }


    console.log('firma:',data?.nombreFirma);
    if (this.data.nombreFirma =='sinFirma.jpg' || this.data.nombreFirma ==''){
      this.imagen=this.imagen+'sinFirma.jpg' // agregar a estructura data.nomreArchivo
    }else{
      this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+data?.nombreFirma  // agregar a estructura data.nomreArchivo
    }

    console.log('firma:',data?.nombreFirma);
    console.log('imegen:',this.imagen)
  }

  nombres = new UntypedFormControl(this.data.nombres, [Validators.required]);
  apellidoPaterno = new UntypedFormControl(this.data.apellidoPaterno, [Validators.required]);
  apellidoMaterno = new UntypedFormControl(this.data.apellidoMaterno, [Validators.required]);
  profesion = new UntypedFormControl(this.data.profesion, [Validators.required]);
  telefono = new UntypedFormControl(this.data.telefono, [Validators.required]);


  modificaValidador : UntypedFormGroup = new UntypedFormGroup({
    nombres: this.nombres,
    apellidoPaterno: this.apellidoPaterno,
    apellidoMaterno: this.apellidoMaterno,
    profesion: this.profesion,
    telefono: this.telefono
  });


  getErrorMessage(campo: string){


    if (campo === 'nombres'){
        return this.nombres.hasError('required') ? 'Debes ingresar Nombres' :'';
    }
    if (campo === 'apellidoPaterno'){
        return this.apellidoPaterno.hasError('required') ? 'Debes ingresar Apellido Paterno'  : '';
    }
    if (campo === 'apellidoMaterno'){
        return this.apellidoMaterno.hasError('required') ? 'Debes ingresar Apellido Materno' : '';
    }
    if (campo === 'profesion'){
      return this.profesion.hasError('required') ? 'Debes ingresar Profesión' : '';
    }
    if (campo === 'telefono'){
        return this.telefono.hasError('required') ? 'Debes ingresar telefono' : '';
    }

    return '';
  }

  ngOnInit() {

  }




  async enviar(){



    let nombreFirma=this.data?.nombreFirma;

    if (this.archivo.nombreArchivo!=''){
      nombreFirma=this.archivo.nombreArchivo
  }



    this.datoEnviaValidador = {
      _id:this.data._id,
      rutValidador: this.data.rutValidador.toUpperCase(),
      nombres: this.modificaValidador.get('nombres')!.value,
      apellidoPaterno: this.modificaValidador.get('apellidoPaterno')!.value,
      apellidoMaterno: this.modificaValidador.get('apellidoMaterno')!.value,
      profesion: this.modificaValidador.get('profesion')!.value,
      telefono: this.modificaValidador.get('telefono')!.value,
      nombreFirma: nombreFirma,
      empresa_Id: this.data.empresa_Id,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id

    };

    this.validadorService.putDataValidador(this.datoEnviaValidador)
      .subscribe(
        dato => {

          if (dato.codigo === 200) {
            if (this.archivo.nombreArchivo!=='sinFirma.jpg'){
              console.log('archivo',this.archivo);
              this.agregaFirmaValidador();
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


  agregaFirmaValidador(){
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



  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    console.log('extensión:',file.src.split(';')[0].split('/')[1]);
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;

    this.archivo.nombreArchivo='fimaValidador_'+this.data?.rutValidador.toUpperCase()+'.'+file.src.split(';')[0].split('/')[1];
    this.archivo.ruta=this.currentUsuario.usuarioDato.empresa.rutEmpresa;
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


}



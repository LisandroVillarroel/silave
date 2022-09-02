import { IEmpresa } from '@app/modelo/empresa-interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConsultaClienteComponent } from '@app/componentes/mantenedores/cliente/consulta-cliente/consulta-cliente.component';
import { EmpresaService } from '@app/servicios/empresa.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';
import { FileHolder } from 'angular2-image-upload';
import { ImagenesService } from '@app/servicios/imagenes.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {

  datoEmpresa!: IEmpresa;

  currentUsuario!: JwtResponseI;
  load: boolean=false;

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
  constructor(
    private empresaService: EmpresaService,
    private authenticationService:AuthenticationService,
    private imagenesService:ImagenesService
   ) {
    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
   }




  async ngOnInit() {

   await this.getEmpresa();

  }

  getEmpresa()  {

    this.empresaService
      .getDataEmpresa(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('empresa:', res['data'])
        this.datoEmpresa = res['data'][0] as IEmpresa;
        console.log('empresa2:', this.datoEmpresa)
        this.load=true;
        console.log('logo:',this.datoEmpresa?.nombreLogo);
        if (this.datoEmpresa?.nombreLogo == undefined || this.datoEmpresa?.nombreLogo=='') {
           this.imagen=this.imagen+'sinLogo.jpg';
        }else{
           this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+this.datoEmpresa?.nombreLogo  // agregar a estructura data.nomreArchivo
        }
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

  enviar(){
    console.log('archivo:',this.archivo.nombreArchivo);
    if (this.archivo.nombreArchivo=='')
    {
      Swal.fire(
        'Debe Ingresar una Imagen',
        '',
        'error'
      )
    }else{
        this.datoEmpresa = {
          _id: this.datoEmpresa._id,
          rutEmpresa: this.datoEmpresa.rutEmpresa,
          razonSocial: this.datoEmpresa.razonSocial,
          nombreFantasia: this.datoEmpresa.nombreFantasia,
          direccion: this.datoEmpresa.direccion,
          nombreContacto: this.datoEmpresa.nombreContacto,
          telefono:this.datoEmpresa.telefono,
          tipoEmpresa:this.datoEmpresa.tipoEmpresa,   //Administrador-Laboratorio-Cliente
          menu_Id: this.datoEmpresa.menu_Id,
          email: this.datoEmpresa.email,
          correoRecepcionSolicitud: this.datoEmpresa.correoRecepcionSolicitud,
          nombreLogo:this.archivo.nombreArchivo,
          usuarioModifica_id: this.currentUsuario.usuarioDato._id
        };
        console.log('datos a grabar:',this.datoEmpresa);
        this.empresaService.putDataEmpresa(this.datoEmpresa)
        .subscribe(
          dato => {
            console.log('respuesta:', dato);
            console.log('respuesta:', dato.mensaje);
            if (dato.codigo === 200) {
              console.log('entro if 200',this.archivo);
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
                Swal.fire(
                'Se agregó con Éxito',
                'Click en Boton!',
                'success'
              ); // ,
              // this.dialogRef.close(1);
            }else{
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

  onUploadFinished(file: FileHolder) {
    console.log('paso1:', file);
    console.log('muestra base64: ', file.src)
    console.log('extensión:',file.src.split(';')[0].split('/')[1]);
    this.imagen64= file.src;
    this.archivo.base64textString=file.src;

    this.archivo.nombreArchivo='logo.'+file.src.split(';')[0].split('/')[1];
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

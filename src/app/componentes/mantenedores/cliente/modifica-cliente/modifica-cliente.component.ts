import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from './../../../../servicios/cliente.service';
import { ICliente, IClienteEmpresa, IEmailCliente } from '../../../../modelo/cliente-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.css']
})
export class ModificaClienteComponent implements OnInit {

  form!: FormGroup;

  // id: string;
  // rutEmpresa: string;
  // razonSocialPar: string;
  // nombreFantasia: string;
  // direccion: string;
  // usuario: string;
  datoClientePar: ICliente;
  datoCliente!: ICliente;
  datoEnviaCorreo!: IEmailCliente;

  //clienteEmpresa!: IClienteEmpresa[];
  datoClienteEmpresaOriginal!: ICliente[];
  datoClienteEmpresaOriginal2!: ICliente[];
  constructor(private dialogRef: MatDialogRef<ModificaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servCliente: ClienteService
              ) {
                this.datoClientePar = data.datoClientePar;
                this.datoClienteEmpresaOriginal = data.datoClienteEmpresaOriginal;
                console.log('dato update: ', data);

              //  let query={'empresa.empresa_Id': , estado: {$ne:'Borrado'}};
              //  let existeElementoMayorQueDiez = this.datoClientePar.find(element=> element.empresa_Id === 10);
               // this.id = data.id;
               // this.rutEmpresa: data.rutEmpresa;
               // this.razonSocialPar = data.razonSocial;
               // nombreFantasia: string;
               // direccion: string;
               // usuario: string;
  }

    razonSocial = new FormControl(this.data.datoClientePar.empresa[0].razonSocial, [Validators.required]);
    nombreFantasia = new FormControl(this.data.datoClientePar.empresa[0].nombreFantasia, [Validators.required]);
    direccion = new FormControl(this.data.datoClientePar.empresa[0].direccion, [Validators.required]);
    telefono = new FormControl(this.data.datoClientePar.empresa[0].telefono, [Validators.required]);
    email = new FormControl(this.data.datoClientePar.empresa[0].email, [Validators.required]);
    nombreContacto = new FormControl(this.data.datoClientePar.empresa[0].nombreContacto, [Validators.required]);
    emailRecepcionExamenCliente = new FormControl(this.data.datoClientePar.emailRecepcionExamenCliente, [Validators.required]);

    //emailEnvio = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.emailEnvio, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
  //password = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.password, [Validators.required]);
    nombreDesde = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.nombreDesde, [Validators.required]);
    asunto = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.asunto, [Validators.required]);
    tituloCuerpo = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.tituloCuerpo, [Validators.required]);
    tituloCuerpoMedio = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.tituloCuerpoMedio, [Validators.required]);
    tituloCuerpoPie = new FormControl(this.data.datoClientePar.empresa[0]?.envioEmail?.tituloCuerpoPie, [Validators.required]);

    modificaCliente: FormGroup = new FormGroup({
      // rutEmpresa: this.datoEmpresaPar.rutEmpresa,
      razonSocial: this.razonSocial,
      nombreFantasia: this.nombreFantasia,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      nombreContacto: this.nombreContacto,
      emailRecepcionExamenCliente: this.emailRecepcionExamenCliente,

      //emailEnvio: this.emailEnvio,
      //password: this.password,
      nombreDesde: this.nombreDesde,
      asunto: this.asunto,
      tituloCuerpo: this.tituloCuerpo,
      tituloCuerpoMedio: this.tituloCuerpoMedio,
      tituloCuerpoPie: this.tituloCuerpoPie
    });

    getErrorMessage() {
      return this.razonSocial.hasError('required') ? 'Debes ingresar Razón Social' :
          this.nombreFantasia.hasError('required') ? 'Debes ingresar Nombre Fantasía' :
          this.direccion.hasError('required') ? 'Debes ingresar Dirección' :
          this.telefono.hasError('required') ? 'Debes ingresar Teléfono' :
          this.email.hasError('required') ? 'Debes ingresar Email' :
          this.nombreContacto.hasError('required') ? 'Debes ingresar Nombre Contacto' :
          this.emailRecepcionExamenCliente.hasError('required') ? 'Debes ingresar Email Envío Exámen' :

          //this.emailEnvio.hasError('required') ? 'Debes ingresar Email Envío' :
          //this.password.hasError('required') ? 'Debes ingresar Email Envío' :
          this.nombreDesde.hasError('required') ? 'Debes ingresar Nombre Desde' :
          this.asunto.hasError('required') ? 'Debes ingresar Asunto' :
          this.tituloCuerpo.hasError('required') ? 'Debes ingresar Título Cuerpo' :
          this.tituloCuerpoMedio.hasError('required') ? 'Debes ingresar Título Cuerpo Medio' :
          this.tituloCuerpoPie.hasError('required') ? 'Debes ingresar Título Cuerpo Pie' :
              '';
    }

  ngOnInit() {
  }

  enviar() {
    /*
    this.clienteEmpresa = [{
  ///    empresa_Id: this.datoClientePar.empresa.empresa_Id,
      razonSocial: this.modificaCliente.get('razonSocial')!.value,
      nombreFantasia: this.modificaCliente.get('nombreFantasia')!.value,
      direccion: this.modificaCliente.get('direccion')!.value,
      telefono: this.modificaCliente.get('telefono')!.value,
      email: this.modificaCliente.get('email')!.value,
      nombreContacto: this.modificaCliente.get('nombreContacto')!.value,
      emailEnvioExamenCliente: this.modificaCliente.get('emailEnvioExamenCliente')!.value,
      usuarioModifica_id: this.data.usuarioModifica_id,
 ///     menu_Id:this.datoClientePar.menu_Id
    }];
*/
    this.datoEnviaCorreo={
     // emailEnvio: this.modificaCliente.get('emailEnvio')!.value,
     // password: this.modificaCliente.get('password')!.value,
      nombreDesde: this.modificaCliente.get('nombreDesde')!.value,
      asunto: this.modificaCliente.get('asunto')!.value,
      tituloCuerpo: this.modificaCliente.get('tituloCuerpo')!.value,
      tituloCuerpoMedio: this.modificaCliente.get('tituloCuerpoMedio')!.value,
      tituloCuerpoPie: this.modificaCliente.get('tituloCuerpoPie')!.value
    }

    console.log('this.datoClienteEmpresaOriginal:',this.datoClienteEmpresaOriginal);
    console.log('dato filtro id:',this.datoClientePar._id);
    this.datoClienteEmpresaOriginal2=this.datoClienteEmpresaOriginal.filter(x=> x._id === this.datoClientePar._id)
    console.log('this.datoClienteEmpresaOriginal Filtrado:',this.datoClienteEmpresaOriginal2);
    for(let b=0; b<this.datoClienteEmpresaOriginal2[0].empresa!.length; b++){
      if(this.datoClienteEmpresaOriginal2[0].empresa![b]._id===this.datoClientePar.empresa![0]._id){
        this.datoClienteEmpresaOriginal2[0].empresa![b].razonSocial= this.modificaCliente.get('razonSocial')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].nombreFantasia= this.modificaCliente.get('nombreFantasia')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].direccion= this.modificaCliente.get('direccion')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].telefono= this.modificaCliente.get('telefono')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].email= this.modificaCliente.get('email')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].nombreContacto= this.modificaCliente.get('nombreContacto')!.value,
        this.datoClienteEmpresaOriginal2[0].empresa![b].envioEmail= this.datoEnviaCorreo,
        this.datoClienteEmpresaOriginal2[0].empresa![b].usuarioModifica_id= this.data.usuarioModifica_id
      }
    }

    console.log('this.datoClienteEmpresaOriginal Modificado:',this.datoClienteEmpresaOriginal2[0].empresa);



    this.datoCliente = {
      _id: this.datoClientePar._id,
      rutCliente: this.datoClientePar.rutCliente,
      empresa: this.datoClienteEmpresaOriginal2[0].empresa,
      emailRecepcionExamenCliente: this.modificaCliente.get('emailRecepcionExamenCliente')!.value,
      usuarioModifica_id: this.datoClientePar.usuarioModifica_id
    };

    console.log('this.datoClienteEmpresaOriginal envia:',this.datoCliente);

    this.servCliente.putDataCliente(this.datoCliente)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Ya se Actualizó con Éxito',
            '',
            'success'
          ),
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
            console.log('Error Cliente:', dato);
            Swal.fire(
              '',
              'ERROR SISTEMA',
              'error'
            );
          }

        }
      }
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );

      // this.dialogRef.close(this.form.value);
    // console.log(this.datoCotiza);
  }

}

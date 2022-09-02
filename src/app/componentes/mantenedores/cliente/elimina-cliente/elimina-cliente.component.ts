import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from './../../../../servicios/cliente.service';
import { ICliente } from '../../../../modelo/cliente-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-cliente',
  templateUrl: './elimina-cliente.component.html',
  styleUrls: ['./elimina-cliente.component.css']
})
export class EliminaClienteComponent implements OnInit {

  datoClientePar: ICliente;
  datoCliente!: ICliente;
  //clienteEmpresa!: IClienteEmpresa[];
  datoClienteEmpresaOriginal!: ICliente[];
  datoClienteEmpresaOriginal2!: ICliente[];

  constructor(private dialogRef: MatDialogRef<EliminaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servCliente: ClienteService
    ) {this.datoClientePar = data.datoClientePar;
                this.datoClienteEmpresaOriginal = data.datoClienteEmpresaOriginal;}

  ngOnInit(): void {
  }

  enviar() {
    console.log('this.datoClienteEmpresaOriginal:',this.datoClienteEmpresaOriginal);
    console.log('dato filtro id:',this.datoClientePar._id);
    this.datoClienteEmpresaOriginal2=this.datoClienteEmpresaOriginal.filter(x=> x._id === this.datoClientePar._id)
    console.log('this.datoClienteEmpresaOriginal Filtrado:',this.datoClienteEmpresaOriginal2);
    for(let b=0; b<this.datoClienteEmpresaOriginal2[0].empresa!.length; b++){
      if(this.datoClienteEmpresaOriginal2[0].empresa![b]._id===this.datoClientePar.empresa![0]._id){
        this.datoClienteEmpresaOriginal2[0].empresa![b].estado='Borrado'
        this.datoClienteEmpresaOriginal2[0].empresa![b].usuarioModifica_id= this.data.usuarioModifica_id
      }
    }

    console.log('this.datoClienteEmpresaOriginal Modificado:',this.datoClienteEmpresaOriginal2[0].empresa);
    this.datoCliente = {
      _id: this.datoClientePar._id,
      rutCliente: this.datoClientePar.rutCliente,
      empresa: this.datoClienteEmpresaOriginal2[0].empresa,
      usuarioModifica_id: this.datoClientePar.usuarioModifica_id
    };

    console.log('this.datoClienteEmpresaOriginal envia:',this.datoCliente);




  /*  this.datoCliente = {
      _id: this.datoClientePar._id,
      rutCliente: this.datoClientePar.rutCliente,
   //   razonSocial: '',
    //  nombreFantasia: '',
    //  direccion: '',
   //   telefono: '',
   //   email: '',
   //   nombreContacto: '',
    //  emailRecepcionExamenCliente: '',
      usuarioModifica_id: this.datoClientePar.usuarioModifica_id
    };
*/
    this.servCliente.deleteDataCliente(this.datoCliente)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se ELIMINÓ con Éxito',
            'Click en Boton!',
            'success'
          ),
          this.dialogRef.close(1);
        }
        else{
          console.log('error', dato);
        }
      }
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );

  }


}

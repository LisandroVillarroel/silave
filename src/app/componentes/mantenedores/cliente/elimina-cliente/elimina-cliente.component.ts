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

  constructor(private dialogRef: MatDialogRef<EliminaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servCliente: ClienteService
    ) {this.datoClientePar = data; }

  ngOnInit(): void {
  }

  enviar() {
    this.datoCliente = {
      _id: this.datoClientePar._id,
      rutCliente: this.datoClientePar.rutCliente,
      razonSocial: '',
      nombreFantasia: '',
      direccion: '',
      telefono: '',
      email: '',
      nombreContacto: '',
      emailEnvioExamenCliente: '',
      usuarioModifica_id: this.datoClientePar.usuarioModifica_id
    };

    this.servCliente.deleteDataCliente(this.datoCliente)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se ELIMINÓ con Exito',
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

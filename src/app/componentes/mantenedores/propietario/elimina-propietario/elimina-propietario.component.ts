import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PropietarioService } from '../../../../servicios/propietario.service';
import { IPropietario } from '../../../../modelo/propietario-interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-propietario',
  templateUrl: './elimina-propietario.component.html',
  styleUrls: ['./elimina-propietario.component.css']
})
export class EliminaPropietarioComponent implements OnInit {

  datoPar: IPropietario;
  dato!: IPropietario;

  constructor(private dialogRef: MatDialogRef<EliminaPropietarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servicioService: PropietarioService
    ) {this.datoPar = data; }

  ngOnInit(): void {
  }

  enviar() {
    /*
    this.dato = {
      _id: this.datoPar._id,
      rutPropietario: this.datoPar.rutPropietario,
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      region: '',
      comuna: '',
      direccion: '',
      telefono: '',
      email: '',
      usuarioModifica_id: this.datoPar.usuarioModifica_id
    };
*/
    this.servicioService.deleteDataPropietario(this.dato)
    .subscribe(
      dato => {
        // tslint:disable-next-line: no-string-literal
        console.log('respuesta:', dato['codigo']);
        // tslint:disable-next-line: no-string-literal
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

  cerrar() {
    this.dialogRef.close();
  }
}

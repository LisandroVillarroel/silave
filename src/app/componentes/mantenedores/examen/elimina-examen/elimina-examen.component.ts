import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from '../../../../modelo/examen-interface';

import Swal from 'sweetalert2';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';

@Component({
  selector: 'app-elimina-examen',
  templateUrl: './elimina-examen.component.html',
  styleUrls: ['./elimina-examen.component.css']
})
export class EliminaExamenComponent implements OnInit {

  datoPar: IExamen;
  dato!: IExamen;
  imagen = './../../../../../assets/imagenes/';
  currentUsuario!: JwtResponseI;

  constructor(private dialogRef: MatDialogRef<EliminaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private servicioService: ExamenService,
              private authenticationService:AuthenticationService,
    ) {
        this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
        if (this.authenticationService.getCurrentUser() != null) {
              this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
        }
        this.datoPar = data;
      }

  ngOnInit(): void {
    this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+this.data.nombreExamen  // agregar a estructura data.nomreArchivo
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
    console.log('elimina:',this.datoPar);
    this.servicioService.deleteDataExamen(this.datoPar)
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

  cerrar() {
    this.dialogRef.close();
  }
}

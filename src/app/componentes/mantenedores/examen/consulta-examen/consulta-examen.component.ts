import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from '../../../../modelo/examen-interface';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';

@Component({
  selector: 'app-consulta-examen',
  templateUrl: './consulta-examen.component.html',
  styleUrls: ['./consulta-examen.component.css']
})
export class ConsultaExamenComponent implements OnInit {

  datoPar: IExamen;

  imagen = './../../../../../assets/imagenes/';
  currentUsuario!: JwtResponseI;

  constructor(private dialogRef: MatDialogRef<ConsultaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private authenticationService:AuthenticationService,
              ) {
                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                if (this.authenticationService.getCurrentUser() != null) {
                      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
                }
                this.datoPar = data;
              }

  ngOnInit() {
    this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+this.data.nombreExamen  // agregar a estructura data.nomreArchivo
  }

  cerrar() {
    this.dialogRef.close();
  }

}

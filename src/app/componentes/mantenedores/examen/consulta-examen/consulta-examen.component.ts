import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ExamenService } from './../../../../servicios/examen.service';
import { IExamen } from '../../../../modelo/examen-interface';

@Component({
  selector: 'app-consulta-examen',
  templateUrl: './consulta-examen.component.html',
  styleUrls: ['./consulta-examen.component.css']
})
export class ConsultaExamenComponent implements OnInit {

  datoPar: IExamen;

  constructor(private dialogRef: MatDialogRef<ConsultaExamenComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servicioService: ExamenService
              ) {
                this.datoPar = data;
              }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}

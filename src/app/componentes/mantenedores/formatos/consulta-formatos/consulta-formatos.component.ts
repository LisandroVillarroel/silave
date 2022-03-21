import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormatos } from './../../../../modelo/formatos-interface';


@Component({
  selector: 'app-consulta-formatos',
  templateUrl: './consulta-formatos.component.html',
  styleUrls: ['./consulta-formatos.component.css']
})
export class ConsultaFormatosComponent implements OnInit {

  datoFormatosPar: IFormatos;
  datoFormatos!: IFormatos;

  constructor(private dialogRef: MatDialogRef<ConsultaFormatosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
                this.datoFormatosPar = data;
              }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}

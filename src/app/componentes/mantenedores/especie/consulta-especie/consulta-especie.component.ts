import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEspecie } from './../../../../modelo/especie-interface';
import { EspecieService } from './../../../../servicios/especie.service';


@Component({
  selector: 'app-consulta-especie',
  templateUrl: './consulta-especie.component.html',
  styleUrls: ['./consulta-especie.component.css']
})
export class ConsultaEspecieComponent implements OnInit {


  datoPar: IEspecie;

  constructor(private dialogRef: MatDialogRef<ConsultaEspecieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public especieService: EspecieService
              ) {
                this.datoPar = data;
              }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}

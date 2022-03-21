import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PropietarioService } from '../../../../servicios/propietario.service';
import { IPropietario } from '../../../../modelo/propietario-interface';

@Component({
  selector: 'app-consulta-propietario',
  templateUrl: './consulta-propietario.component.html',
  styleUrls: ['./consulta-propietario.component.css']
})
export class ConsultaPropietarioComponent implements OnInit {

  datoPar: IPropietario;

  constructor(private dialogRef: MatDialogRef<ConsultaPropietarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servicioService: PropietarioService
              ) {
                this.datoPar = data;
              }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}

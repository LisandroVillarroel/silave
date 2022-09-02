import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDoctorSolicitante } from '@app/modelo/doctorSolicitante-interface';


@Component({
  selector: 'app-consulta-doctor-solicitante',
  templateUrl: './consulta-doctor-solicitante.component.html',
  styleUrls: ['./consulta-doctor-solicitante.component.css']
})
export class ConsultaDoctorSolicitanteComponent implements OnInit {


  datoPar: IDoctorSolicitante;

  constructor(private dialogRef: MatDialogRef<ConsultaDoctorSolicitanteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {
                this.datoPar = data;
              }

  ngOnInit() {
  }

}

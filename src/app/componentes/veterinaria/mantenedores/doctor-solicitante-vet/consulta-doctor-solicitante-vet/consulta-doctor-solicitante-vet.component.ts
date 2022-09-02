import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDoctorSolicitante } from '@app/modelo/doctorSolicitante-interface';

@Component({
  selector: 'app-consulta-doctor-solicitante-vet',
  templateUrl: './consulta-doctor-solicitante-vet.component.html',
  styleUrls: ['./consulta-doctor-solicitante-vet.component.css']
})
export class ConsultaDoctorSolicitanteVetComponent implements OnInit {

  datoPar: IDoctorSolicitante;

  constructor(private dialogRef: MatDialogRef<ConsultaDoctorSolicitanteVetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {
                this.datoPar = data;
              }

  ngOnInit(): void {
  }

}

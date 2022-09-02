import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta-ficha-vet',
  templateUrl: './consulta-ficha-vet.component.html',
  styleUrls: ['./consulta-ficha-vet.component.css']
})
export class ConsultaFichaVetComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConsultaFichaVetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}

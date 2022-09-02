import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta-ficha',
  templateUrl: './consulta-ficha.component.html',
  styleUrls: ['./consulta-ficha.component.css']
})
export class ConsultaFichaComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConsultaFichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log('consulta ficha:',data);
    }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from './../../../../servicios/cliente.service';
import { ICliente } from '../../../../modelo/cliente-interface';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {



  constructor(private dialogRef: MatDialogRef<ConsultaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public servCliente: ClienteService
              ) {

              }

  ngOnInit() {
  }



}

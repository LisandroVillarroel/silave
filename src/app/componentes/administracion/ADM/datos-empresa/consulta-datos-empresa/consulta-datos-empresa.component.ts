import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaClienteComponent } from '@app/componentes/mantenedores/cliente/consulta-cliente/consulta-cliente.component';

@Component({
  selector: 'app-consulta-datos-empresa',
  templateUrl: './consulta-datos-empresa.component.html',
  styleUrls: ['./consulta-datos-empresa.component.css']
})
export class ConsultaDatosEmpresaComponent implements OnInit {

  imagen = './../../../../../assets/imagenes/';
  constructor( private dialogRef: MatDialogRef<ConsultaClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                if (data?.nombreLogo == undefined || data?.nombreLogo=='' || data?.nombreLogo=='sinLogo.jpg') {
                  this.imagen=this.imagen+'sinLogo.jpg';
               }else{
                  this.imagen=this.imagen+ data.rutEmpresa+'/'+data?.nombreLogo  // agregar a estructura data.nomreArchivo
               }
               }

  ngOnInit(): void {
  }

}


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { ConsultaClienteComponent } from '@app/componentes/mantenedores/cliente/consulta-cliente/consulta-cliente.component';

@Component({
  selector: 'app-consulta-validadores',
  templateUrl: './consulta-validadores.component.html',
  styleUrls: ['./consulta-validadores.component.css']
})
export class ConsultaValidadoresComponent implements OnInit {

  imagen = './../../../../../assets/imagenes/';
  currentUsuario!: JwtResponseI;

  constructor( private dialogRef: MatDialogRef<ConsultaValidadoresComponent>,
              private authenticationService:AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                if (this.authenticationService.getCurrentUser() != null) {
                      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
                }

                if (data?.nombreFirma == undefined || data?.nombreFirma=='' || data?.nombreFirma=='sinFirma.jpg') {
                  this.imagen=this.imagen+'sinFirma.jpg';
                }else{
                    this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+data?.nombreFirma  // agregar a estructura data.nomreArchivo
                }
               }

  ngOnInit(): void {
  }

}

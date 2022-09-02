import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IValidador } from '@app/modelo/validador-interface';
import { ValidadorService } from '@app/servicios/validador.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-validadores',
  templateUrl: './elimina-validadores.component.html',
  styleUrls: ['./elimina-validadores.component.css']
})
export class EliminaValidadoresComponent implements OnInit {

  datoValidador!: IValidador;
  currentUsuario!: JwtResponseI;
  imagen = './../../../../../assets/imagenes/';
  load: boolean=false;

  constructor(private dialogRef: MatDialogRef<EliminaValidadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public validadorService: ValidadorService,
    private authenticationService: AuthenticationService) {

      console.log('dato elimina:',data)

                this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                if (this.authenticationService.getCurrentUser() != null) {
                      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
                }

                if (data?.nombreFirma == undefined || data?.nombreFirma=='' || data?.nombreFirma=='sinFirma.jpg') {
                  this.imagen=this.imagen+'sinFirma.jpg';
                }else{
                    this.imagen=this.imagen+ this.currentUsuario.usuarioDato.empresa.rutEmpresa+'/'+data?.nombreFirma  // agregar a estructura data.nomreArchivo
                }

                this.datoValidador=data;

      this.load=true;
     }

  ngOnInit(): void {
  }


  enviar() {
    this.datoValidador.usuarioModifica_id = this.currentUsuario.usuarioDato._id;


    this.validadorService.deleteDataValidador(this.datoValidador)
    .subscribe(
      dato => {
        console.log('respuesta:', dato['codigo']);
        if (dato['codigo'] === 200) {
            Swal.fire(
            'Se ELIMINÓ con Éxito',
            '',
            'success'
          ),
          this.dialogRef.close(1);
        }
        else{
          console.log('error', dato);
        }
      }
       // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
      );

  }
}

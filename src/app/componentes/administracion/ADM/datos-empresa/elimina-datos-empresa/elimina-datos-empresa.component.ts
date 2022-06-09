import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-elimina-datos-empresa',
  templateUrl: './elimina-datos-empresa.component.html',
  styleUrls: ['./elimina-datos-empresa.component.css']
})
export class EliminaDatosEmpresaComponent implements OnInit {

  datoEmpresa!: IEmpresa;
  currentUsuario!: JwtResponseI;
  imagen = './../../../../../assets/imagenes/';
  load: boolean=false;

  constructor(private dialogRef: MatDialogRef<EliminaDatosEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servEmpresa: EmpresaService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      console.log('dato elimina:',data)

      if (data?.nombreLogo == undefined || data?.nombreLogo=='' || data?.nombreLogo=='sinLogo.jpg') {
        this.imagen=this.imagen+'sinLogo.jpg';
      }else{
          this.imagen=this.imagen+ data.rutEmpresa+'/'+data?.nombreLogo  // agregar a estructura data.nomreArchivo
      }
      this.load=true;
     }

  ngOnInit(): void {
  }


  enviar() {
    this.datoEmpresa.usuarioModifica_id = this.currentUsuario.usuarioDato._id;


    this.servEmpresa.deleteDataEmpresa(this.datoEmpresa)
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

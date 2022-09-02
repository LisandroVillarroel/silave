import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FichaService } from '@app/servicios/ficha.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { PerfilBioquimicoComponent } from '../perfil-bioquimico.component';

@Component({
  selector: 'app-imprime-perfil-bioquimico',
  templateUrl: './imprime-perfil-bioquimico.component.html',
  styleUrls: ['./imprime-perfil-bioquimico.component.css']
})
export class ImprimePerfilBioquimicoComponent implements AfterViewInit {

  @Input()
  public datoFichaRecibe!: any;


  currentUsuario!: JwtResponseI;

  constructor(public fichaService: FichaService,private dialogRef: MatDialogRef<PerfilBioquimicoComponent>,
     private authenticationService: AuthenticationService,) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
   }

  async ngAfterViewInit() {
    if (this.authenticationService.getCurrentUser() != null) {

      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      console.log('usuariooooo:',this.currentUsuario);
    }

    console.log('serie blanca 1:',this.datoFichaRecibe.formatoResultado?.perfilBioquimico.resultado[0]);

   // await this.verificaParametrosResultado();
    await this.openPDF()
  }


  public openPDF():void {

    let DATA = document.getElementById('htmlData')!;

//scale permite mejor calidad imagen

    html2canvas(DATA, {scale: 2}).then(canvas => {


      const context = canvas.getContext('2d');


        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;


        const FILEURI = canvas.toDataURL('image/PNG',1)
        let PDF = new jsPDF('p', 'mm', 'letter');
        let position = 0;


        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight,undefined,'FAST')
        //(imageData, formato, x, y, ancho, alto, alias, compresión, rotación)
     //   var out64 = btoa(PDF.output());

        var file = PDF.output('blob');

        this.datoFichaRecibe.datoArchivo.nombreArchivo=this.datoFichaRecibe.fichaC.numeroFicha;
       // this.datoFichaRecibe.datoArchivo.archivo64=out64;
        console.log('ficha con base64:',this.datoFichaRecibe);


              console.log('file:',file);
              //this.fichaService.upload(file,this.datoFichaRecibe.fichaC.numeroFicha+'.pdf',this.currentUsuario.usuarioDato.empresa.empresa_Id,this.currentUsuario.usuarioDato.empresa.rutEmpresa,this.datoFichaRecibe.fichaC.examen.nombre,this.datoFichaRecibe.fichaC.numeroFicha,this.datoFichaRecibe._id).subscribe(
              this.fichaService.upload(file,this.datoFichaRecibe.fichaC.numeroFicha+'.pdf',this.datoFichaRecibe._id).subscribe(
                (event: any) => {
                  console.log('termino',event.codigo)

                    if (event.codigo === 200) {
                        console.log('respuesta sube pdf:',event);
                        Swal.fire(
                              'Se agregó con Éxito',
                              '',
                              'success'
                            );
                           this.dialogRef.close(1);
                      }else{
                        console.log('error',event);
                        Swal.fire(
                          event.mensaje,
                          'Click en Boton!',
                          'error'
                        );
                        this.dialogRef.close(1);
                      }
                }
              );

          //    PDF.save(this.datoFichaRecibe.fichaC.numeroFicha||'.pdf');  baja archivo pdf

            //    this.dialogRef.close(1);




    });


  }
}

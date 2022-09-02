import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IHemogramaSerieBlanca, IHemogramaSerieRoja } from '@app/modelo/examenHemograma-interface';
import { IFicha } from '@app/modelo/ficha-interface';
import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
import { FichaService } from '@app/servicios/ficha.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { HemogramaComponent } from '../hemograma.component';
import { EmpresaService } from '@app/servicios/empresa.service';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';

@Component({
  selector: 'app-imprime-hemograma',
  templateUrl: './imprime-hemograma.component.html',
  styleUrls: ['./imprime-hemograma.component.css']
})
export class ImprimeHemogramaComponent implements OnInit, AfterViewInit {

  @Input()
  public datoFichaRecibe!: any;

  datoHemogramaSerieRoja: IHemogramaSerieRoja[]=[];
  datoHemogramaSerieBlanca!: IHemogramaSerieBlanca[];


  srHematocritoFlag = false;
  srEritrocitosFlag = false;
  srHemoglobinaFlag = false;
  srVcmFlag = false;
  srChcmFlag = false;
  srHcmFlag = false;
  srReticulocitosFlag = false;
  srPlaquetasFlag = false;

  sbLeucocitos2Flag = false;
  sbNeutrofilosFlag = false;
  sbLinfocitosFlag = false;
  sbMonocitosFlag = false;
  sbEosinofilosFlag = false;
  sbBasofilosFlag = false;
  sbBaciliformesFlag = false;

  currentUsuario!: JwtResponseI;

  constructor(public fichaService: FichaService,private dialogRef: MatDialogRef<HemogramaComponent>,
    private empresaService: EmpresaService, private authenticationService: AuthenticationService,) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
   }

  async ngOnInit() {
    if (this.authenticationService.getCurrentUser() != null) {

      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      console.log('usuariooooo:',this.currentUsuario);
    }

    console.log('serie blanca 1:',this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0]);

    console.log('resultado serie roja:',this.datoHemogramaSerieRoja[0]);
    await this.verificaParametrosSerieRoja();
    await this.verificaParametrosSerieBlanca();

  }

  async ngAfterViewInit(){
    await this.openPDF()
  }

  verificaParametrosSerieRoja(){

    if (this.datoFichaRecibe.fichaC.especie?.nombre.toUpperCase()=="CANINO"){
      console.log('resultado serie roja:',this.datoHemogramaSerieRoja);
        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[0].resultado)<37 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[0].resultado)>50){this.srHematocritoFlag=true}
        else{this.srHematocritoFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[1].resultado)<5.5 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[1].resultado)>8.5){this.srEritrocitosFlag=true}
        else{this.srEritrocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[2].resultado)<12 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[2].resultado)>18){this.srHemoglobinaFlag=true}
        else{this.srHemoglobinaFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[3].resultado)<60 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[3].resultado)>70){this.srVcmFlag=true}
        else{this.srVcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[4].resultado)<32 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[4].resultado)>36){this.srChcmFlag=true}
        else{this.srChcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[5].resultado)<19.5 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[5].resultado)>24.5){this.srHcmFlag=true}
        else{this.srHcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[6].resultado)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[6].resultado)>1.5){this.srReticulocitosFlag=true}
        else{this.srReticulocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[7].resultado)<200 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[7].resultado)>500){this.srPlaquetasFlag=true}
        else{this.srPlaquetasFlag=false}
    }




    if (this.datoFichaRecibe.fichaC.especie?.nombre.toUpperCase()=="FELINO"){

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[0].resultado)<24 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[0].resultado)>45){this.srHematocritoFlag=true}
        else{this.srHematocritoFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[1].resultado)<5 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[1].resultado)>10){this.srEritrocitosFlag=true}
        else{this.srEritrocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[2].resultado)<8 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[2].resultado)>15){this.srHemoglobinaFlag=true}
        else{this.srHemoglobinaFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[3].resultado)<39 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[3].resultado)>55){this.srVcmFlag=true}
        else{this.srVcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[4].resultado)<30 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[4].resultado)>36){this.srChcmFlag=true}
        else{this.srChcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[5].resultado)<13 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[5].resultado)>17){this.srHcmFlag=true}
        else{this.srHcmFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[6].resultado)<0.2 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[6].resultado)>1.6){this.srReticulocitosFlag=true}
        else{this.srReticulocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[7].resultado)<300 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieRoja.IHemogramaSerieRoja[7].resultado)>800){this.srPlaquetasFlag=true}
        else{this.srPlaquetasFlag=false}
    };
  }

  verificaParametrosSerieBlanca(){
    console.log('canino-felino:',this.datoFichaRecibe.fichaC.especie?.nombre.toUpperCase());
    if (this.datoFichaRecibe.fichaC.especie?.nombre.toUpperCase()=="CANINO"){
console.log('serie Blanca 0',this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum);
  //    if (this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum!=''){
        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum)<5000 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum)>17000){this.sbLeucocitos2Flag=true} //sbLeucocitos2
        else{this.sbLeucocitos2Flag=false}
  //    }
        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[1].resultadoNum)<3300 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[1].resultadoNum)>11500){this.sbNeutrofilosFlag=true} //sbNeutrofilos
        else{this.sbNeutrofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[2].resultadoNum)<1000 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[2].resultadoNum)>4800){this.sbLinfocitosFlag=true} //sbLinfocitos
        else{this.sbLinfocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[3].resultadoNum)<250 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[3].resultadoNum)>1350){this.sbMonocitosFlag=true} //sbMonocitos
        else{this.sbMonocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[4].resultadoNum)<100 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[4].resultadoNum)>1500){this.sbEosinofilosFlag=true} //sbEosinofilos
        else{this.sbEosinofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[5].resultadoNum)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[5].resultadoNum)>200){this.sbBasofilosFlag=true} //sbBasofilos
        else{this.sbBasofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[6].resultadoNum)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[6].resultadoNum)>300){this.sbBaciliformesFlag=true} //sbBaciliformes
        else{this.sbBaciliformesFlag=false}
    }

    if (this.datoFichaRecibe.fichaC.especie?.nombre.toUpperCase()=="FELINO"){

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum)<5000 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[0].resultadoNum)>19000){this.sbLeucocitos2Flag=true} //sbLeucocitos2
        else{this.sbLeucocitos2Flag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[1].resultadoNum)<2500 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[1].resultadoNum)>12500){this.sbNeutrofilosFlag=true} //sbNeutrofilos
        else{this.sbNeutrofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[2].resultadoNum)<1500 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[2].resultadoNum)>7000){this.sbLinfocitosFlag=true} //sbLinfocitos
        else{this.sbLinfocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[3].resultadoNum)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[3].resultadoNum)>850){this.sbMonocitosFlag=true} //sbMonocitos
        else{this.sbMonocitosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[4].resultadoNum)<100 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[4].resultadoNum)>1500){this.sbEosinofilosFlag=true} //sbEosinofilos
        else{this.sbEosinofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[5].resultadoNum)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[5].resultadoNum)>100){this.sbBasofilosFlag=true} //sbBaciliformes
        else{this.sbBasofilosFlag=false}

        if (Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[6].resultadoNum)<0 || Number(this.datoFichaRecibe.formatoResultado?.hemograma?.serieBlanca.IHemogramaSerieBlanca[6].resultadoNum)>300){this.sbBaciliformesFlag=true}
        else{this.sbBaciliformesFlag=false}
    }
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

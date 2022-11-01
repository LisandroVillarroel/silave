import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { ICliente } from '@app/modelo/cliente-interface';
import { IPerfilBioquimico, IResultado } from '@app/modelo/examenPerfilBioquimico-interface';
import { IFicha } from '@app/modelo/ficha-interface';
import { ClienteService } from '@app/servicios/cliente.service';
import { ExamenService } from '@app/servicios/examen.service';
import { FichaService } from '@app/servicios/ficha.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-bioquimico',
  templateUrl: './perfil-bioquimico.component.html',
  styleUrls: ['./perfil-bioquimico.component.css']
})
export class PerfilBioquimicoComponent implements OnInit {

  @ViewChild('htmlData') htmlData!:ElementRef;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

    currentUsuario!: JwtResponseI;

    form!: UntypedFormGroup;
    usuario!: string;
    datoFicha!: IFicha;
    datoFichaRespuesta!: IFicha;
    /*datoExamen!: IExamen[];*/

    IPerfilBioquimico!: IPerfilBioquimico;
    IResultado!: IResultado[];

    datoClienteEmpresa!: ICliente;
    emailRecepcionExamenCliente='';

    srAlbuminaFlag = false;
    srBilirrubinaTotalFlag = false;
    srBilirrubinaIndirectaFlag = false;
    srBilirrubinaDirectaFlag = false;
    srCalcioFlag = false;
    srColesterolFlag = false;
    srCreatininaFlag = false;
    srFosfatasaAlcalinaFlag = false;
    srFosforoFlag = false;
    srGGTFlag = false;
    srGlobulinasFlag = false;
    srGPTFlag = false;
    srGOTFlag = false;
    srGlucosaFlag = false;
    srUreaFlag = false;
    srNitrogenoUreicoSFlag = false;
    srProteinasTotalesFlag = false;

    imprime=false;

    nombreExamen='';

    constructor(private dialogRef: MatDialogRef<PerfilBioquimicoComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private examenService: ExamenService,
                private clienteService: ClienteService,
                private fichaService: FichaService,
                private authenticationService: AuthenticationService
                ) {
                  this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                 console.log('ficha:',data);
                 this.datoFicha=data;
      }

    srAlbumina = new UntypedFormControl('',  [Validators.required] );
    srBilirrubinaTotal = new UntypedFormControl('',  [Validators.required] );
    srBilirrubinaIndirecta = new UntypedFormControl('');
    srBilirrubinaDirecta = new UntypedFormControl('');
    srCalcio = new UntypedFormControl('');
    srColesterol = new UntypedFormControl('');
    srCreatinina = new UntypedFormControl('');
    srFosfatasaAlcalina = new UntypedFormControl('');
    srFosforo = new UntypedFormControl('');
    srGGT = new UntypedFormControl('');
    srGlobulinas = new UntypedFormControl('');
    srGPT = new UntypedFormControl('');
    srGOT = new UntypedFormControl('');
    srGlucosa = new UntypedFormControl('');
    srUrea = new UntypedFormControl('');
    srNitrogenoUreicoS = new UntypedFormControl('');
    srProteinasTotales = new UntypedFormControl('');
    srObservaciones = new UntypedFormControl('');

    ingresaPerfilBioquimico: UntypedFormGroup = new UntypedFormGroup({
       srAlbumina: this.srAlbumina,
       srBilirrubinaTotal: this.srBilirrubinaTotal,
       srBilirrubinaIndirecta: this.srBilirrubinaIndirecta,
       srBilirrubinaDirecta: this.srBilirrubinaDirecta,
       srCalcio: this.srCalcio,
       srColesterol: this.srColesterol,
       srCreatinina: this.srCreatinina,
       srFosfatasaAlcalina: this.srFosfatasaAlcalina,
       srFosforo: this.srFosforo,
       srGGT: this.srGGT,
       srGlobulinas: this.srGlobulinas,
       srGPT: this.srGPT,
       srGOT: this.srGOT,
       srGlucosa: this.srGlucosa,
       srUrea: this.srUrea,
       srNitrogenoUreicoS: this.srNitrogenoUreicoS,
       srProteinasTotales: this.srProteinasTotales,
       srObservaciones: this.srObservaciones
      });

      getErrorMessage(campo: string) {

        if (campo === 'srAlbumina'){
          return this.srAlbumina.hasError('required') ? 'Debes Ingresar Albúmina' : '';
        }

        if (campo === 'srBilirrubinaTotal'){
          return this.srBilirrubinaTotal.hasError('required') ? 'Debes Ingresar Bilirrubina Total' : '';
        }

        if (campo === 'srBilirrubinaIndirecta'){
          return this.srBilirrubinaIndirecta.hasError('required') ? 'Debes Ingresar Bilirrubina Indirecta' : '';
        }

        if (campo === 'srBilirrubinaDirecta'){
          return this.srBilirrubinaDirecta.hasError('required') ? 'Debes Ingresar Bilirrubina Directa' : '';
        }

        if (campo === 'srCalcio'){
          return this.srCalcio.hasError('required') ? 'Debes Ingresar Calcio' : '';
        }

        if (campo === 'srColesterol'){
          return this.srColesterol.hasError('required') ? 'Debes Ingresar Colesterol' : '';
        }

        if (campo === 'srCreatinina'){
          return this.srCreatinina.hasError('required') ? 'Debes Ingresar Creatinina' : '';
        }

        if (campo === 'srFosfatasaAlcalina'){
          return this.srFosfatasaAlcalina.hasError('required') ? 'Debes Ingresar Fosfatasa Alcalina' : '';
        }

        if (campo === 'srFosforo'){
          return this.srFosforo.hasError('required') ? 'Debes Ingresar Fósforo' : '';
        }

        if (campo === 'srGGT'){
          return this.srGGT.hasError('required') ? 'Debes Ingresar GGT' : '';
        }

        if (campo === 'srGlobulinas'){
          return this.srGlobulinas.hasError('required') ? 'Debes Ingresar Globulinas' : '';
        }

        if (campo === 'srGPT'){
          return this.srGPT.hasError('required') ? 'Debes Ingresar GPT (ALT)' : '';
        }

        if (campo === 'srGOT'){
          return this.srGOT.hasError('required') ? 'Debes Ingresar GOT (AST)' : '';
        }

        if (campo === 'srGlucosa'){
          return this.srGlucosa.hasError('required') ? 'Debes Ingresar Glucosa' : '';
        }

        if (campo === 'srUrea'){
          return this.srUrea.hasError('required') ? 'Debes Ingresar Urea' : '';
        }

        if (campo === 'srNitrogenoUreicoS'){
          return this.srNitrogenoUreicoS.hasError('required') ? 'Debes Ingresar Nitrógeno Ureico S.' : '';
        }

        if (campo === 'srProteinasTotales'){
          return this.srProteinasTotales.hasError('required') ? 'Debes Ingresar Proteínas Totales' : '';
        }

        if (campo === 'srObservaciones'){
          return this.srObservaciones.hasError('required') ? 'Debes Ingresar Observaciones' : '';
        }

        return '';
      }


    ngOnInit() {
    //  this.getExamen();
    if (this.data.fichaC.validador.nombreFirma=='sinFirma.jpg' || this.data.fichaC.validador.nombreFirma=='' || this.data.fichaC.validador.nombreFirma==undefined){
      Swal.fire(
        'El exámen no cuenta con Firma Validador',
        '',
        'error'
      );
      this.dialogRef.close(1);
      }
      this.getCliente();
    }
/*
    getExamen(): void {
      this.examenService
        .getDataExamen(this.data.fichaC.examen.idExamen)
        .subscribe(res => {
          console.log('pasa exámen 2', res);
          if (res.data[0].nombreExamen=='sinFirma.jpg' || res.data[0].nombreExamen=='' || res.data[0].nombreExamen==undefined){
            Swal.fire(
              'El exámen no cuenta con Firma Doctor',
              '',
              'error'
            );
            this.dialogRef.close(1);
          }else{
            this.data.fichaC.examen.nombreExamen=res.data[0].nombreExamen
          }
        },
        // console.log('yo:', res as PerfilI[]),
        error => {
          console.log('error carga:', error);
          Swal.fire(
            'ERROR INESPERADO',
            error,
           'error'
         );
        }
      ); // (this.dataSource.data = res as PerfilI[])
    }
    */

  srAlbuminaFormula(){
    console.log('paso1 falg:',this.srAlbuminaFlag)

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
        if (this.ingresaPerfilBioquimico.get('srAlbumina')!.value<2.6 || this.ingresaPerfilBioquimico.get('srAlbumina')!.value>3.3){this.srAlbuminaFlag=true}
        else{this.srAlbuminaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srAlbumina')!.value<2.1 || this.ingresaPerfilBioquimico.get('srAlbumina')!.value>3.3){this.srAlbuminaFlag=true}
        else{this.srAlbuminaFlag=false}
    }

  //  this.sumaTotal();
  }

  srBilirrubinaTotalFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srBilirrubinaTotal:',this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value);
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value<0.1 || this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value>0.7){this.srBilirrubinaTotalFlag=true}
        else{this.srBilirrubinaTotalFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value<0.1 || this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value>0.7){this.srBilirrubinaTotalFlag=true}
        else{this.srBilirrubinaTotalFlag=false}
    }
  //  this.sumaTotal();
  }

  srBilirrubinaIndirectaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srBilirrubinaIndirecta:',this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value);
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value<0.1 || this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value>0.49){this.srBilirrubinaIndirectaFlag=true}
        else{this.srBilirrubinaIndirectaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value<0.1 || this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value>0.49){this.srBilirrubinaIndirectaFlag=true}
        else{this.srBilirrubinaIndirectaFlag=false}
    }
 //   this.sumaTotal();
  }

  srBilirrubinaDirectaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srBilirrubinaDirecta:',this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value);
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value<0 || this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value>0.3){this.srBilirrubinaDirectaFlag=true}
        else{this.srBilirrubinaDirectaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value<0 || this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value>0.3){this.srBilirrubinaDirectaFlag=true}
        else{this.srBilirrubinaDirectaFlag=false}
    }
  //  this.sumaTotal();
  }


  srCalcioFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srCalcio:',this.ingresaPerfilBioquimico.get('srCalcio')!.value);
        if (this.ingresaPerfilBioquimico.get('srCalcio')!.value<9 || this.ingresaPerfilBioquimico.get('srCalcio')!.value>12){this.srCalcioFlag=true}
        else{this.srCalcioFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srCalcio')!.value<9 || this.ingresaPerfilBioquimico.get('srCalcio')!.value>12){this.srCalcioFlag=true}
        else{this.srCalcioFlag=false}
    }
   // this.sumaTotal();
  }

  srColesterolFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srColesterol:',this.ingresaPerfilBioquimico.get('srColesterol')!.value);
        if (this.ingresaPerfilBioquimico.get('srColesterol')!.value<105 || this.ingresaPerfilBioquimico.get('srColesterol')!.value>300){this.srColesterolFlag=true}
        else{this.srColesterolFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srColesterol')!.value<70 || this.ingresaPerfilBioquimico.get('srColesterol')!.value>200){this.srColesterolFlag=true}
        else{this.srColesterolFlag=false}
    }
   // this.sumaTotal();
  }

  srCreatininaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srCreatinina:',this.ingresaPerfilBioquimico.get('srCreatinina')!.value);
        if (this.ingresaPerfilBioquimico.get('srCreatinina')!.value<0.5 || this.ingresaPerfilBioquimico.get('srCreatinina')!.value>1.5){this.srCreatininaFlag=true}
        else{this.srCreatininaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srCreatinina')!.value<0.8 || this.ingresaPerfilBioquimico.get('srCreatinina')!.value>1.8){this.srCreatininaFlag=true}
        else{this.srCreatininaFlag=false}
    }
  //  this.sumaTotal();
  }

  srFosfatasaAlcalinaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srFosfatasaAlcalina:',this.ingresaPerfilBioquimico.get('srFosfatasaAlcalina')!.value);
        if (this.ingresaPerfilBioquimico.get('srFosfatasaAlcalina')!.value<160 ){this.srFosfatasaAlcalinaFlag=true}
        else{this.srFosfatasaAlcalinaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srFosfatasaAlcalina')!.value<85){this.srFosfatasaAlcalinaFlag=true}
        else{this.srFosfatasaAlcalinaFlag=false}
    }
    //this.sumaTotal();
  }

  srFosforoFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srFosforo:',this.ingresaPerfilBioquimico.get('srFosforo')!.value);
        if (this.ingresaPerfilBioquimico.get('srFosforo')!.value<2.6 || this.ingresaPerfilBioquimico.get('srFosforo')!.value>6.2){this.srFosforoFlag=true}
        else{this.srFosforoFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srFosforo')!.value<4.5 || this.ingresaPerfilBioquimico.get('srFosforo')!.value>8.1){this.srFosforoFlag=true}
        else{this.srFosforoFlag=false}
    }
    //this.sumaTotal();
  }


  srGGTFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srGGT:',this.ingresaPerfilBioquimico.get('srGGT')!.value);
        if (this.ingresaPerfilBioquimico.get('srGGT')!.value<10){this.srGGTFlag=true}
        else{this.srGGTFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srGGT')!.value<6.5){this.srGGTFlag=true}
        else{this.srGGTFlag=false}
    }
    //this.sumaTotal();
  }


  srGlobulinasFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srGlobulinas:',this.ingresaPerfilBioquimico.get('srGlobulinas')!.value);
        if (this.ingresaPerfilBioquimico.get('srGlobulinas')!.value<2.6 || this.ingresaPerfilBioquimico.get('srGlobulinas')!.value>4.4){this.srGlobulinasFlag=true}
        else{this.srGlobulinasFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srGlobulinas')!.value<2.6 || this.ingresaPerfilBioquimico.get('srGlobulinas')!.value>5.1){this.srGlobulinasFlag=true}
        else{this.srGlobulinasFlag=false}
    }
    //this.sumaTotal();
  }

  srGPTFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srGPT:',this.ingresaPerfilBioquimico.get('srGPT')!.value);
        if (this.ingresaPerfilBioquimico.get('srGPT')!.value<68){this.srGPTFlag=true}
        else{this.srGPTFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srGPT')!.value<68){this.srGPTFlag=true}
        else{this.srGPTFlag=false}
    }
    //this.sumaTotal();
  }

  srGOTFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srGOT:',this.ingresaPerfilBioquimico.get('srGOT')!.value);
        if (this.ingresaPerfilBioquimico.get('srGOT')!.value<55){this.srGOTFlag=true}
        else{this.srGOTFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srGOT')!.value<55){this.srGOTFlag=true}
        else{this.srGOTFlag=false}
    }
    //this.sumaTotal();
  }

  srGlucosaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srGlucosa:',this.ingresaPerfilBioquimico.get('srGlucosa')!.value);
        if (this.ingresaPerfilBioquimico.get('srGlucosa')!.value<65 || this.ingresaPerfilBioquimico.get('srGlucosa')!.value>118){this.srGlucosaFlag=true}
        else{this.srGlucosaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srGlucosa')!.value<70 || this.ingresaPerfilBioquimico.get('srGlucosa')!.value>110){this.srGlucosaFlag=true}
        else{this.srGlucosaFlag=false}
    }
    //this.sumaTotal();
  }

  srUreaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srFosbUreasforo:',this.ingresaPerfilBioquimico.get('srUrea')!.value);
        if (this.ingresaPerfilBioquimico.get('srUrea')!.value<21.5 || this.ingresaPerfilBioquimico.get('srUrea')!.value>64.5){this.srUreaFlag=true}
        else{this.srUreaFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srUrea')!.value<38.7 || this.ingresaPerfilBioquimico.get('srUrea')!.value>71){this.srUreaFlag=true}
        else{this.srUreaFlag=false}
    }
    //this.sumaTotal();
  }

  srNitrogenoUreicoSFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srNitrogenoUreicoS:',this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value);
        if (this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value<10 || this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value>30){this.srNitrogenoUreicoSFlag=true}
        else{this.srNitrogenoUreicoSFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value<18 || this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value>33){this.srNitrogenoUreicoSFlag=true}
        else{this.srNitrogenoUreicoSFlag=false}
    }
    //this.sumaTotal();
  }

  srProteinasTotalesFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srProteinasTotales:',this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value);
        if (this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value<5.5 || this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value>7.5){this.srProteinasTotalesFlag=true}
        else{this.srProteinasTotalesFlag=false}
    }
    else{
        if (this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value<5.4 || this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value>7.8){this.srProteinasTotalesFlag=true}
        else{this.srProteinasTotalesFlag=false}
    }
    //this.sumaTotal();
  }


  async getCliente() {
    console.log('pasa emp 2:',this.data.fichaC.cliente.idCliente);
    this.clienteService
      .getDataClienteActual(this.data.fichaC.cliente.idCliente)
      .subscribe((res) => {
        console.log('cliente2: ', res['data'][0] as ICliente);
        this.datoClienteEmpresa=res['data'][0] as ICliente;
        this.data.fichaC.cliente.correoRecepcionCliente=this.datoClienteEmpresa.emailRecepcionExamenCliente;
        console.log('this.datoClienteEmpresa.empresa:', this.data.fichaC.cliente.correoRecepcionCliente);

      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error,
         'error'
       );
      }
    ); // (this.dataSource.data = res as PerfilI[])
  }



    retorna0NaN(valor:any){
      if (isNaN(valor))
         return 0;
      else
         return valor;

    }

    async enviar() {


       this.IResultado= [
          {
            parametro: 'Albúmina',
            resultado: this.ingresaPerfilBioquimico.get('srAlbumina')!.value,
            unidad: 'mg/dl',
            caninos: '2.6 - 3.3',
            felinos: '2.1 - 3.3',
            flag: this.srAlbuminaFlag
          },
          {
            parametro: 'Bilirrubina Total',
            resultado: this.ingresaPerfilBioquimico.get('srBilirrubinaTotal')!.value,
            unidad: 'mg/dl',
            caninos: '0.1 - 0.7',
            felinos: '0.1 - 0.7',
            flag: this.srBilirrubinaTotalFlag
          },
          {
            parametro: 'Bilirrubina Indirecta',
            resultado: this.ingresaPerfilBioquimico.get('srBilirrubinaIndirecta')!.value,
            unidad: 'mg/dl',
            caninos: '0.1 - 0.49',
            felinos: '0.1 - 0.49',
            flag: this.srBilirrubinaIndirectaFlag
          },
          {
            parametro: 'Bilirrubina Directa',
            resultado: this.ingresaPerfilBioquimico.get('srBilirrubinaDirecta')!.value,
            unidad: 'mg/dl',
            caninos: '0 - 0.3',
            felinos: '0 - 0.3',
            flag: this.srBilirrubinaDirectaFlag
          },
          {
            parametro: 'Calcio',
            resultado: this.ingresaPerfilBioquimico.get('srCalcio')!.value,
            unidad: 'mg/dl',
            caninos: '9 - 12',
            felinos: '9 - 12',
            flag: this.srCalcioFlag
          },
          {
            parametro: 'Colesterol',
            resultado: this.ingresaPerfilBioquimico.get('srColesterol')!.value,
            unidad: 'mg/dl',
            caninos: '105 - 300',
            felinos: '70 - 200',
            flag: this.srColesterolFlag
          },
          {
            parametro: 'Creatinina',
            resultado: this.ingresaPerfilBioquimico.get('srCreatinina')!.value,
            unidad: 'mg/dl',
            caninos: '0.5 - 1.5',
            felinos: '0.8 - 1.8',
            flag: this.srCreatininaFlag
          },
          {
            parametro: 'Fosfatasa Alcalina',
            resultado: this.ingresaPerfilBioquimico.get('srFosfatasaAlcalina')!.value,
            unidad: 'U/l',
            caninos: '< 160',
            felinos: '< 85',
            flag: this.srFosfatasaAlcalinaFlag
          },
          {
            parametro: 'Fósforo',
            resultado: this.ingresaPerfilBioquimico.get('srFosforo')!.value,
            unidad: 'mg/dl',
            caninos: '2.6 - 6.2',
            felinos: '4.5 - 8.1',
            flag: this.srFosforoFlag
          },
          {
            parametro: 'GGT',
            resultado: this.ingresaPerfilBioquimico.get('srGGT')!.value,
            unidad: 'U/l',
            caninos: '< 10',
            felinos: '< 6.5',
            flag: this.srGGTFlag
          },
          {
            parametro: 'Globulinas',
            resultado: this.ingresaPerfilBioquimico.get('srGlobulinas')!.value,
            unidad: 'mg/dl',
            caninos: '2.6 - 4.4',
            felinos: '2.6 - 5.1',
            flag: this.srGlobulinasFlag
          },
          {
            parametro: 'GPT (ALT)',
            resultado: this.ingresaPerfilBioquimico.get('srGPT')!.value,
            unidad: 'U/l',
            caninos: '< 68',
            felinos: '< 68',
            flag: this.srGPTFlag
          },
          {
            parametro: 'GOT (AST)',
            resultado: this.ingresaPerfilBioquimico.get('srGOT')!.value,
            unidad: 'U/l',
            caninos: '< 55',
            felinos: '< 55',
            flag: this.srGOTFlag
          },
          {
            parametro: 'Glucosa',
            resultado: this.ingresaPerfilBioquimico.get('srGlucosa')!.value,
            unidad: 'mg/dl',
            caninos: '65 - 118',
            felinos: '70 - 110',
            flag: this.srGlucosaFlag
          },
          {
            parametro: 'Urea',
            resultado: this.ingresaPerfilBioquimico.get('srUrea')!.value,
            unidad: 'mg/dl',
            caninos: '21.5 - 64.5',
            felinos: '38.7 - 71',
            flag: this.srUreaFlag
          },
          {
            parametro: 'Nitrógeno Ureico S.',
            resultado: this.ingresaPerfilBioquimico.get('srNitrogenoUreicoS')!.value,
            unidad: 'mg/dl',
            caninos: '10 - 30',
            felinos: '18 - 33',
            flag: this.srNitrogenoUreicoSFlag
          },
          {
            parametro: 'Proteínas Totales',
            resultado: this.ingresaPerfilBioquimico.get('srProteinasTotales')!.value,
            unidad: 'gr/dl',
            caninos: '5.5 - 7.5',
            felinos: '5.4 - 7.8',
            flag: this.srProteinasTotalesFlag
          },
        ]


      this.IPerfilBioquimico= {
          resultado: this.IResultado,
          observaciones: this.ingresaPerfilBioquimico.get('srObservaciones')!.value,


      }

     this.datoFicha = {
       _id:this.data._id,
      fichaC: this.data.fichaC,
      empresa: this.data.empresa,
      formatoResultado:{
    //    examen: this.data.fichaC.examen,
        perfilBioquimico: this.IPerfilBioquimico,
      },

      datoArchivo:{
        nombreArchivo: '',
        archivo64: ''
      },
      estadoFicha:'Enviado',
      usuarioModifica_id: this.currentUsuario.usuarioDato._id,
      usuarioEnviaCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioEnviaModifica_id: this.currentUsuario.usuarioDato._id,
      fechaHora_envia_crea: new Date(),
      fechaHora_envia_modifica: new Date(),

     };

     this.datoFichaRespuesta=this.datoFicha; //Para imprimir
     console.log('agrega 1:', this.datoFicha);

     this.fichaService.putDataFicha(this.datoFicha)
     .subscribe(
       dato => {
         console.log('respuesta:', dato);
         if (dato.codigo === 200) {
          this.datoFichaRespuesta=this.datoFicha; //Para imprimir
         //    Swal.fire(
         //    'Ya se agrego con Exito',
         //    'Click en Boton!',
         //    'success'
         //  ); // ,
           this.imprime=true;
         //  this.dialogRef.close(1);

         }else{
           console.log('error:',dato)
           Swal.fire(
             dato.mensaje,
             'Click en Boton!',
             'error'
           );
           this.dialogRef.close(1);
         }
       }
     );

   }



  }


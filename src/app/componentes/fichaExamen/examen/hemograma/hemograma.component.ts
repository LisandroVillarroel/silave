import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
  import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

  //import { RutService } from 'rut-chileno';


  import Swal from 'sweetalert2';
  import { ExamenService } from './../../../../servicios/examen.service';
  import { IExamen } from './../../../../modelo/examen-interface';
  import { IFicha } from './../../../../modelo/ficha-interface';
import { IHemograma, IHemogramaSerieBlanca, IHemogramaSerieRoja } from '@app/modelo/examenHemograma-interface';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { FichaService } from '@app/servicios/ficha.service';
import { MatAccordion } from '@angular/material/expansion';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';


@Component({
  selector: 'app-hemograma',
  templateUrl: './hemograma.component.html',
  styleUrls: ['./hemograma.component.css']
})
export class HemogramaComponent implements OnInit {

  @ViewChild('htmlData') htmlData!:ElementRef;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

    currentUsuario!: JwtResponseI;

    form!: UntypedFormGroup;
    usuario!: string;
    datoFicha!: IFicha;
    datoFichaRespuesta!: IFicha;
    /*datoExamen!: IExamen[];*/

    IHemograma!: IHemograma;
    IHemogramaSerieRoja!: IHemogramaSerieRoja[];
    IHemogramaSerieBlanca!: IHemogramaSerieBlanca[];

    datoClienteEmpresa!: ICliente;
    emailRecepcionExamenCliente='';


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

    sbTotal=0;


    sbNeutrofilosFormula=0;
    sbLinfocitosFormula=0;
    sbMonocitosFormula=0;
    sbEosinofilosFormula=0;
    sbBasofilosFormula=0;
    sbBaciliformesFormula=0;

    imprime=false;

    constructor(private dialogRef: MatDialogRef<HemogramaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private clienteService: ClienteService,
                private fichaService: FichaService,
                private authenticationService: AuthenticationService
                ) {
                  this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                 console.log('ficha:',data);
                 this.datoFicha=data;
      }
    //  examen = new FormControl('', [Validators.required] );
      srHematocrito = new UntypedFormControl('',  [Validators.required] );
      srEritrocitos = new UntypedFormControl('',  [Validators.required] );
      srHemoglobina = new UntypedFormControl('');
      srVcm = new UntypedFormControl('');
      srChcm = new UntypedFormControl('');
      srHcm = new UntypedFormControl('');
      srReticulocitos = new UntypedFormControl('');
      srPlaquetas = new UntypedFormControl('');


      sbLeucocitos2 = new UntypedFormControl('');
      sbNeutrofilos = new UntypedFormControl('');
      sbLinfocitos = new UntypedFormControl('');
      sbMonocitos = new UntypedFormControl('');
      sbEosinofilos = new UntypedFormControl('');
      sbBasofilos = new UntypedFormControl('');
      sbBaciliformes = new UntypedFormControl('');
      sbTotalP= new UntypedFormControl('', [Validators.required]);

      obsEritrocitos = new UntypedFormControl('');
      obsLeucocitos = new UntypedFormControl('');
      obsPlaquetas = new UntypedFormControl('');

      ingresaHemograma: UntypedFormGroup = new UntypedFormGroup({
       // examen: this.examen,
       srHematocrito: this.srHematocrito,
       srEritrocitos: this.srEritrocitos,
       srHemoglobina: this.srHemoglobina,
       srVcm: this.srVcm,
       srChcm: this.srChcm,
       srHcm: this.srHcm,
       srReticulocitos: this.srReticulocitos,
       srPlaquetas: this.srPlaquetas,

       sbLeucocitos2: this.sbLeucocitos2,
       sbNeutrofilos: this.sbNeutrofilos,
       sbLinfocitos: this.sbLinfocitos,
       sbMonocitos: this.sbMonocitos,
       sbEosinofilos: this.sbEosinofilos,
       sbBasofilos: this.sbBasofilos,
       sbBaciliformes: this.sbBaciliformes,
       sbTotalP: this.sbTotalP,

       obsEritrocitos: this.obsEritrocitos,
       obsLeucocitos: this.obsLeucocitos,
       obsPlaquetas: this.obsPlaquetas
      });

      getErrorMessage(campo: string) {

      //  if (campo === 'examen'){
      //      return this.examen.hasError('required') ? 'Debes Seleccionar Exámen' : '';
      //  }

        if (campo === 'srHematocrito'){
          return this.srHematocrito.hasError('required') ? 'Debes Ingresar Hematocrito' : '';
        }

        if (campo === 'srEritrocitos'){
          return this.srEritrocitos.hasError('required') ? 'Debes Ingresar Eritrocitos' : '';
        }

        return '';
      }


    ngOnInit() {
      console.log('ficha2:',this.data)
   /*   this.cargaExamen();*/
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
    cargaExamen(){
      this.servicioService
        .getDataExamen(this.data.empresa.empresa_Id)
        .subscribe(res => {
          console.log('rescata examen todo: ', res['data']);
          this.datoExamen = res['data'] as any;
        },
        // console.log('yo:', res as PerfilI[]),
        error => {
          console.log('error carga:', error);
          Swal.fire(
            'ERROR INESPERADO',
            error,
           'info'
         );
        }
      );
    }
*/

  srHematocritoFormula(){
    console.log('paso1 falg:',this.srHematocritoFlag)

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
        if (this.ingresaHemograma.get('srHematocrito')!.value<37 || this.ingresaHemograma.get('srHematocrito')!.value>50){this.srHematocritoFlag=true}
        else{this.srHematocritoFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srHematocrito')!.value<24 || this.ingresaHemograma.get('srHematocrito')!.value>45){this.srHematocritoFlag=true}
        else{this.srHematocritoFlag=false}
    }

    this.sumaTotal();
  }

  srEritrocitosFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor eritrocitos:',this.ingresaHemograma.get('srEritrocitos')!.value);
        if (this.ingresaHemograma.get('srEritrocitos')!.value<5.5 || this.ingresaHemograma.get('srEritrocitos')!.value>8.5){this.srEritrocitosFlag=true}
        else{this.srEritrocitosFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srEritrocitos')!.value<5 || this.ingresaHemograma.get('srEritrocitos')!.value>10){this.srEritrocitosFlag=true}
        else{this.srEritrocitosFlag=false}
    }
    this.sumaTotal();
  }

  srHemoglobinaFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srHemoglobina:',this.ingresaHemograma.get('srHemoglobina')!.value);
        if (this.ingresaHemograma.get('srHemoglobina')!.value<12 || this.ingresaHemograma.get('srHemoglobina')!.value>18){this.srHemoglobinaFlag=true}
        else{this.srHemoglobinaFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srHemoglobina')!.value<8 || this.ingresaHemograma.get('srHemoglobina')!.value>15){this.srHemoglobinaFlag=true}
        else{this.srHemoglobinaFlag=false}
    }
    this.sumaTotal();
  }

  srVcmFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srVcm:',this.ingresaHemograma.get('srVcm')!.value);
        if (this.ingresaHemograma.get('srVcm')!.value<60 || this.ingresaHemograma.get('srVcm')!.value>70){this.srVcmFlag=true}
        else{this.srVcmFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srVcm')!.value<39 || this.ingresaHemograma.get('srVcm')!.value>55){this.srVcmFlag=true}
        else{this.srVcmFlag=false}
    }
    this.sumaTotal();
  }


  srChcmFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srChcm:',this.ingresaHemograma.get('srChcm')!.value);
        if (this.ingresaHemograma.get('srChcm')!.value<32 || this.ingresaHemograma.get('srChcm')!.value>36){this.srChcmFlag=true}
        else{this.srChcmFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srChcm')!.value<30 || this.ingresaHemograma.get('srChcm')!.value>36){this.srChcmFlag=true}
        else{this.srChcmFlag=false}
    }
    this.sumaTotal();
  }

  srHcmFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srHcm:',this.ingresaHemograma.get('srHcm')!.value);
        if (this.ingresaHemograma.get('srHcm')!.value<19.5 || this.ingresaHemograma.get('srHcm')!.value>24.5){this.srHcmFlag=true}
        else{this.srHcmFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srHcm')!.value<13 || this.ingresaHemograma.get('srHcm')!.value>17){this.srHcmFlag=true}
        else{this.srHcmFlag=false}
    }
    this.sumaTotal();
  }

  srReticulocitosFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srReticulocitos:',this.ingresaHemograma.get('srReticulocitos')!.value);
        if (this.ingresaHemograma.get('srReticulocitos')!.value<0 || this.ingresaHemograma.get('srReticulocitos')!.value>1.5){this.srReticulocitosFlag=true}
        else{this.srReticulocitosFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srReticulocitos')!.value<0.2 || this.ingresaHemograma.get('srReticulocitos')!.value>1.6){this.srReticulocitosFlag=true}
        else{this.srReticulocitosFlag=false}
    }
    this.sumaTotal();
  }

  srPlaquetasFormula(){

    if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
      console.log('valor srPlaquetas:',this.ingresaHemograma.get('srPlaquetas')!.value);
        if (this.ingresaHemograma.get('srPlaquetas')!.value<200 || this.ingresaHemograma.get('srPlaquetas')!.value>500){this.srPlaquetasFlag=true}
        else{this.srPlaquetasFlag=false}
    }
    else{
        if (this.ingresaHemograma.get('srPlaquetas')!.value<300 || this.ingresaHemograma.get('srPlaquetas')!.value>800){this.srPlaquetasFlag=true}
        else{this.srPlaquetasFlag=false}
    }
    this.sumaTotal();
  }


   async sbCambioFormula(){

      this.sbNeutrofilosFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbNeutrofilos')!.value)/100;
      this.sbLinfocitosFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbLinfocitos')!.value)/100;
      this.sbMonocitosFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbMonocitos')!.value)/100;
      this.sbEosinofilosFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbEosinofilos')!.value)/100;
      this.sbBasofilosFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbBasofilos')!.value)/100;
      this.sbBaciliformesFormula = await (this.ingresaHemograma.get('sbLeucocitos2')!.value*this.ingresaHemograma.get('sbBaciliformes')!.value)/100;

      await this.sumaTotal();
      await this.verificaParametrosSerieBlanca();
    }

    verificaParametrosSerieBlanca(){
      console.log('canino-felino:',this.data.fichaC.especie.nombre.toUpperCase());
      if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
        console.log('valor sbNeutrofilos:',this.ingresaHemograma.get('sbNeutrofilos')!.value);
        if (this.ingresaHemograma.get('sbLeucocitos2')!.value<5000 || this.ingresaHemograma.get('sbLeucocitos2')!.value>17000){this.sbLeucocitos2Flag=true}
        else{this.sbLeucocitos2Flag=false}

          if (this.sbNeutrofilosFormula<3300 || this.sbNeutrofilosFormula>11500){this.sbNeutrofilosFlag=true}
          else{this.sbNeutrofilosFlag=false}

          if (this.sbLinfocitosFormula<1000 || this.sbLinfocitosFormula>4800){this.sbLinfocitosFlag=true}
          else{this.sbLinfocitosFlag=false}

          if (this.sbMonocitosFormula<250 || this.sbMonocitosFormula>1350){this.sbMonocitosFlag=true}
          else{this.sbMonocitosFlag=false}

          if (this.sbEosinofilosFormula<100 || this.sbEosinofilosFormula>1500){this.sbEosinofilosFlag=true}
          else{this.sbEosinofilosFlag=false}

          if (this.sbBasofilosFormula<0 || this.sbBasofilosFormula>200){this.sbBasofilosFlag=true}
          else{this.sbBasofilosFlag=false}

          if (this.sbBaciliformesFormula<0 || this.sbBaciliformesFormula>300){this.sbBaciliformesFlag=true}
          else{this.sbBaciliformesFlag=false}
      }

      if (this.data.fichaC.especie.nombre.toUpperCase()=="FELINO"){
        console.log('valor sbNeutrofilos Felino:',this.ingresaHemograma.get('sbNeutrofilos')!.value);
          if (this.ingresaHemograma.get('sbLeucocitos2')!.value<5000 || this.ingresaHemograma.get('sbLeucocitos2')!.value>19000){this.sbLeucocitos2Flag=true}
          else{this.sbLeucocitos2Flag=false}

          if (this.ingresaHemograma.get('sbNeutrofilos')!.value<2500 || this.ingresaHemograma.get('sbNeutrofilos')!.value>12500){this.sbNeutrofilosFlag=true}
          else{this.sbNeutrofilosFlag=false}

          if (this.ingresaHemograma.get('sbLinfocitos')!.value<1500 || this.ingresaHemograma.get('sbLinfocitos')!.value>7000){this.sbLinfocitosFlag=true}
          else{this.sbLinfocitosFlag=false}

          if (this.ingresaHemograma.get('sbMonocitos')!.value<0 || this.ingresaHemograma.get('sbMonocitos')!.value>850){this.sbMonocitosFlag=true}
          else{this.sbMonocitosFlag=false}

          if (this.ingresaHemograma.get('sbEosinofilos')!.value<100 || this.ingresaHemograma.get('sbEosinofilos')!.value>1500){this.sbEosinofilosFlag=true}
          else{this.sbEosinofilosFlag=false}

          if (this.ingresaHemograma.get('sbBasofilos')!.value<0 || this.ingresaHemograma.get('sbBasofilos')!.value>100){this.sbBasofilosFlag=true}
          else{this.sbBasofilosFlag=false}

          if (this.ingresaHemograma.get('sbBaciliformes')!.value<0 || this.ingresaHemograma.get('sbBaciliformes')!.value>300){this.sbBaciliformesFlag=true}
          else{this.sbBaciliformesFlag=false}
      }
    }


    async sumaTotal(){
      //await this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srHematocrito')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srEritrocitos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srHemoglobina')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srVcm')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srChcm')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srHcm')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srReticulocitos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('srPlaquetas')!.value))+
      this.sbTotal= this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbNeutrofilos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbLinfocitos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbMonocitos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbEosinofilos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbBasofilos')!.value))+this.retorna0NaN(parseFloat(this.ingresaHemograma.get('sbBaciliformes')!.value))

      console.log('total:',this.sbTotal)
      if (this.sbTotal==100){
        this.ingresaHemograma.get('sbTotalP')!.clearValidators();
      }
      else{
        if (this.sbTotal>100){
          Swal.fire(
            'El total del Exámen Excede del 100%',
            '',
            'error'
          );
        }
        this.ingresaHemograma.get('sbTotalP')!.setValidators([Validators.required]);
      }
      this.ingresaHemograma.get('sbTotalP')!.updateValueAndValidity();
    }

    retorna0NaN(valor:any){
      if (isNaN(valor))
         return 0;
      else
         return valor;

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

    async enviar() {


       this.IHemogramaSerieRoja= [
          {
            parametro: 'Hematocrito',
            resultado: this.ingresaHemograma.get('srHematocrito')!.value,
            unidad: '%',
            caninos: '37 - 50',
            felinos: '24 - 45'
          },
          {
            parametro: 'Eritrocitos',
            resultado: this.ingresaHemograma.get('srEritrocitos')!.value,
            unidad: '10⁶/µl',
            caninos: '5.5 - 8.5',
            felinos: '5 - 10'
          },
          {
            parametro: 'Hemoglobina',
            resultado: this.ingresaHemograma.get('srHemoglobina')!.value,
            unidad: 'g/dl',
            caninos: '12 - 18',
            felinos: '8 - 15'
          },
          {
            parametro: 'VCM',
            resultado: this.ingresaHemograma.get('srVcm')!.value,
            unidad: 'Fl',
            caninos: '60 - 70',
            felinos: '39 - 55'
          },
          {
            parametro: 'CHCM',
            resultado: this.ingresaHemograma.get('srChcm')!.value,
            unidad: 'g/dl',
            caninos: '32 - 36',
            felinos: '30 - 36'
          },
          {
            parametro: 'HCM',
            resultado: this.ingresaHemograma.get('srHcm')!.value,
            unidad: 'Pgr',
            caninos: '19.5 - 24.5',
            felinos: '13 - 17'
          },
          {
            parametro: 'Reticulocitos',
            resultado: this.ingresaHemograma.get('srReticulocitos')!.value,
            unidad: '%',
            caninos: '0 - 1.5',
            felinos: '0.2 - 1.6'
          },
          {
            parametro: 'Plaquetas',
            resultado: this.ingresaHemograma.get('srReticulocitos')!.value,
            unidad: 'Miles/µl',
            caninos: '200 - 50',
            felinos: '300 - 800'
          },
        ]


        this.IHemogramaSerieBlanca= [
          {
            parametro: 'Leucocitos',
            resultadoPrc: '',
            resultadoNum: this.ingresaHemograma.get('sbLeucocitos2')!.value,
            caninos: '5.000 - 17.000',
            felinos: '5.000 - 19.500'
          },
          {
            parametro: 'Neutrófilos',
            resultadoPrc: this.ingresaHemograma.get('sbNeutrofilos')!.value,
            resultadoNum: this.sbNeutrofilosFormula.toString(),
            caninos: '3.300 - 11.500',
            felinos: '2.500 - 12.500'
          },
          {
            parametro: 'Linfocitos',
            resultadoPrc: this.ingresaHemograma.get('sbLinfocitos')!.value,
            resultadoNum: this.sbLinfocitosFormula.toString(),
            caninos: '1.000 - 4.800',
            felinos: '1.500 - 7.000'
          },
          {
            parametro: 'Monocitos',
            resultadoPrc: this.ingresaHemograma.get('sbMonocitos')!.value,
            resultadoNum: this.sbMonocitosFormula.toString(),
            caninos: '250 - 1.350',
            felinos: '0 - 850'
          },
          {
            parametro: 'Eosinófilos',
            resultadoPrc: this.ingresaHemograma.get('sbEosinofilos')!.value,
            resultadoNum: this.sbEosinofilosFormula.toString(),
            caninos: '100 - 1.500',
            felinos: '100 - 1.500'
          },
          {
            parametro: 'Basófilos',
            resultadoPrc: this.ingresaHemograma.get('sbBasofilos')!.value,
            resultadoNum: this.sbBasofilosFormula.toString(),
            caninos: '0 - 200',
            felinos: '0 - 100'
          },
          {
            parametro: 'Baciliformes',
            resultadoPrc: this.ingresaHemograma.get('sbBaciliformes')!.value,
            resultadoNum: this.sbBaciliformesFormula.toString(),
            caninos: '0 - 300',
            felinos: '0 - 300'
          },
      ]

      this.IHemograma= {
        serieRoja: {
          IHemogramaSerieRoja: this.IHemogramaSerieRoja,
        },
        serieBlanca: {
          IHemogramaSerieBlanca: this.IHemogramaSerieBlanca,
        },
        total: this.sbTotal,
        eritrocitos: this.ingresaHemograma.get('obsEritrocitos')!.value,
        leucocitos: this.ingresaHemograma.get('obsLeucocitos')!.value,
        plaquetas: this.ingresaHemograma.get('obsPlaquetas')!.value


      }

     this.datoFicha = {
       _id:this.data._id,
      fichaC: this.data.fichaC,
      empresa: this.data.empresa,
      formatoResultado:{
        //examen: this.data.fichaC.examen,
        hemograma: this.IHemograma
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
             '',
             'error'
           );
           this.dialogRef.close(1);
         }
       }
     );

   }

  }


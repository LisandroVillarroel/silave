import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//import { RutService } from 'rut-chileno';

import {RutValidator} from 'ng2-rut';
import { validateRut, formatRut, RutFormat } from '@fdograph/rut-utilities';

import Swal from 'sweetalert2';
import { ExamenService } from './../../../../../servicios/examen.service';
import { IExamen } from './../../../../../modelo/examen-interface';
import { IDatos, IFormato1 } from './../../../../../modelo/formato1-interface';
import { Formato1Service } from './../../../../../servicios/formato1.service';
import { IFicha } from './../../../../../modelo/ficha-interface';

@Component({
  selector: 'app-agrega-formato1',
  templateUrl: './agrega-formato1.component.html',
  styleUrls: ['./agrega-formato1.component.css']
})
export class AgregaFormato1Component implements OnInit {

  @Input()
  datoFichaRecibe!: IFicha;

  form!: FormGroup;
  usuario: string;
  dato!: IFormato1;
  datoExamen!: IExamen[];
  datoIngreso: IDatos[]=[];


  srHematocritoFlag = false;
  srEritrocitosFlag = false;
  srHemoglobinaFlag = false;
  srVcmFlag = false;
  srChcmFlag = false;
  srHcmFlag = false;
  srReticulocitosFlag = false;
  srPlaquetasFlag = false;

  sbTotal=0;


  sbNeutrofilosFormula=0;
  sbLinfocitosFormula=0;
  sbMonocitosFormula=0;
  sbEosinofilosFormula=0;
  sbBasofilosFormula=0;
  sbBaciliformesFormula=0;

  constructor(private dialogRef: MatDialogRef<AgregaFormato1Component>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public servicioService: ExamenService,
              public formato1Service: Formato1Service,
           //   public rutService: RutService,
              public rutValidator: RutValidator
              ) {
               this.usuario = data.usuario;
               console.log('ficha:',this.datoFichaRecibe)
    }
  //  examen = new FormControl('', [Validators.required] );
    srHematocrito = new FormControl('',  [Validators.required] );
    srEritrocitos = new FormControl('',  [Validators.required] );
    srHemoglobina = new FormControl('');
    srVcm = new FormControl('');
    srChcm = new FormControl('');
    srHcm = new FormControl('');
    srReticulocitos = new FormControl('');
    srPlaquetas = new FormControl('');


    sbLeucocitos2 = new FormControl('');
    sbNeutrofilos = new FormControl('');
    sbLinfocitos = new FormControl('');
    sbMonocitos = new FormControl('');
    sbEosinofilos = new FormControl('');
    sbBasofilos = new FormControl('');
    sbBaciliformes = new FormControl('');

    obsEritrocitos = new FormControl('');
    obsLeucocitos = new FormControl('');
    obsPlaquetas = new FormControl('');

    agregaFormato1: FormGroup = new FormGroup({
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
    console.log('ficha2:',this.datoFichaRecibe)
    this.cargaExamen();
  }

  cargaExamen(){
    this.servicioService
      .getDataExamenTodo(this.data.empresa_Id)
      .subscribe(res => {
        console.log('rescata examen todo: ', res['data']);
        this.datoExamen = res['data'];
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

  async enviar() {}

  /*
  async enviar() {
     await this.agregaMatrizIngreso();

    this.dato = {

      nombreFormato: 'Formato 1',
      formato: [{
        nombreTitulo: this.agregaFormato1.get('c1Titulo').value,
        cuadros: [{
          titulo: this.agregaFormato1.get('c1SubTitulo').value,
          titulos1: {
            campo1: this.agregaFormato1.get('c1L1Campo1').value,
            campo2: this.agregaFormato1.get('c1L1Campo2').value,
            campo3: this.agregaFormato1.get('c1L1Campo3').value,
            campo4: this.agregaFormato1.get('c1L1Campo4').value,
          },
          titulos2: {
            campo1: this.agregaFormato1.get('c1L2Campo1').value,
            campo2: this.agregaFormato1.get('c1L2Campo2').value,
            campo3: this.agregaFormato1.get('c1L2Campo3').value,
            campo4: this.agregaFormato1.get('c1L2Campo4').value,
            campo5: this.agregaFormato1.get('c1L2Campo5').value,
          },
          datos: this.datoIngreso,
        }],
      }],
      usuarioCrea_id: this.usuario,
      usuarioModifica_id: this.usuario
    };
    console.log('agrega 1:', this.dato);

    this.formato1Service.postDataFormato1(this.dato)
    .subscribe(
      dato => {
        console.log('respuesta:', dato);
        if (dato.codigo === 200) {
            Swal.fire(
            'Ya se agrego con Exito',
            'Click en Boton!',
            'success'
          ); // ,
            this.dialogRef.close(1);
        }else{
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
  // Error handling
  cerrar() {
    this.dialogRef.close();
  }
*/
srHematocritoFormula(){
  console.log('paso1 falg:',this.srHematocritoFlag)

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
      if (this.agregaFormato1.get('srHematocrito')!.value<37 || this.agregaFormato1.get('srHematocrito')!.value>50){this.srHematocritoFlag=true}
      else{this.srHematocritoFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srHematocrito')!.value<24 || this.agregaFormato1.get('srHematocrito')!.value>45){this.srHematocritoFlag=true}
      else{this.srHematocritoFlag=false}
  }

  this.sumaTotal();
}

srEritrocitosFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor eritrocitos:',this.agregaFormato1.get('srEritrocitos')!.value);
      if (this.agregaFormato1.get('srEritrocitos')!.value<5.5 || this.agregaFormato1.get('srEritrocitos')!.value>8.5){this.srEritrocitosFlag=true}
      else{this.srEritrocitosFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srEritrocitos')!.value<5 || this.agregaFormato1.get('srEritrocitos')!.value>10){this.srEritrocitosFlag=true}
      else{this.srEritrocitosFlag=false}
  }
  this.sumaTotal();
}

srHemoglobinaFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srHemoglobina:',this.agregaFormato1.get('srHemoglobina')!.value);
      if (this.agregaFormato1.get('srHemoglobina')!.value<12 || this.agregaFormato1.get('srHemoglobina')!.value>18){this.srHemoglobinaFlag=true}
      else{this.srHemoglobinaFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srHemoglobina')!.value<8 || this.agregaFormato1.get('srHemoglobina')!.value>15){this.srHemoglobinaFlag=true}
      else{this.srHemoglobinaFlag=false}
  }
  this.sumaTotal();
}

srVcmFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srVcm:',this.agregaFormato1.get('srVcm')!.value);
      if (this.agregaFormato1.get('srVcm')!.value<60 || this.agregaFormato1.get('srVcm')!.value>70){this.srVcmFlag=true}
      else{this.srVcmFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srVcm')!.value<39 || this.agregaFormato1.get('srVcm')!.value>55){this.srVcmFlag=true}
      else{this.srVcmFlag=false}
  }
  this.sumaTotal();
}


srChcmFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srChcm:',this.agregaFormato1.get('srChcm')!.value);
      if (this.agregaFormato1.get('srChcm')!.value<32 || this.agregaFormato1.get('srChcm')!.value>36){this.srChcmFlag=true}
      else{this.srChcmFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srChcm')!.value<30 || this.agregaFormato1.get('srChcm')!.value>36){this.srChcmFlag=true}
      else{this.srChcmFlag=false}
  }
  this.sumaTotal();
}

srHcmFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srHcm:',this.agregaFormato1.get('srHcm')!.value);
      if (this.agregaFormato1.get('srHcm')!.value<19.5 || this.agregaFormato1.get('srHcm')!.value>24.5){this.srHcmFlag=true}
      else{this.srHcmFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srHcm')!.value<13 || this.agregaFormato1.get('srHcm')!.value>17){this.srHcmFlag=true}
      else{this.srHcmFlag=false}
  }
  this.sumaTotal();
}

srReticulocitosFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srReticulocitos:',this.agregaFormato1.get('srReticulocitos')!.value);
      if (this.agregaFormato1.get('srReticulocitos')!.value<0 || this.agregaFormato1.get('srReticulocitos')!.value>1.5){this.srReticulocitosFlag=true}
      else{this.srReticulocitosFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srReticulocitos')!.value<0.2 || this.agregaFormato1.get('srReticulocitos')!.value>1.6){this.srReticulocitosFlag=true}
      else{this.srReticulocitosFlag=false}
  }
  this.sumaTotal();
}

srPlaquetasFormula(){

  if (this.datoFichaRecibe.fichaC.especie!.nombre.toUpperCase()=="CANINO"){
    console.log('valor srPlaquetas:',this.agregaFormato1.get('srPlaquetas')!.value);
      if (this.agregaFormato1.get('srPlaquetas')!.value<200 || this.agregaFormato1.get('srPlaquetas')!.value>500){this.srPlaquetasFlag=true}
      else{this.srPlaquetasFlag=false}
  }
  else{
      if (this.agregaFormato1.get('srPlaquetas')!.value<300 || this.agregaFormato1.get('srPlaquetas')!.value>800){this.srPlaquetasFlag=true}
      else{this.srPlaquetasFlag=false}
  }
  this.sumaTotal();
}


sbCambioFormula(){

    this.sbNeutrofilosFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbNeutrofilos')!.value)/100;
    this.sbLinfocitosFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbLinfocitos')!.value)/100;
    this.sbMonocitosFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbMonocitos')!.value)/100;
    this.sbEosinofilosFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbEosinofilos')!.value)/100;
    this.sbBasofilosFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbBasofilos')!.value)/100;
    this.sbBaciliformesFormula = (this.agregaFormato1.get('sbLeucocitos2')!.value*this.agregaFormato1.get('sbBaciliformes')!.value)/100;

    this.sumaTotal();
  }

  sumaTotal(){
    this.sbTotal=this.retorna0NaN(parseFloat(this.agregaFormato1.get('srHematocrito')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srEritrocitos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srHemoglobina')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srVcm')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srChcm')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srHcm')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srReticulocitos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('srPlaquetas')!.value))+
    this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbNeutrofilos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbLinfocitos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbMonocitos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbEosinofilos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbBasofilos')!.value))+this.retorna0NaN(parseFloat(this.agregaFormato1.get('sbBaciliformes')!.value))
  }

  retorna0NaN(valor:any){
    if (isNaN(valor))
       return 0;
    else
       return valor;

  }


}


import { Component, OnInit, Inject } from '@angular/core';
  import { FormGroup, FormControl, Validators } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { ICliente } from './../../../../modelo/cliente-interface';
  import { IExamen } from './../../../../modelo/examen-interface';
  import { IUsuario } from './../../../../modelo/usuario-interface';
  import { ClienteService } from './../../../../servicios/cliente.service';
  import { ExamenService } from './../../../../servicios/examen.service';


  import Swal from 'sweetalert2';
  import { RazaService } from './../../../../servicios/raza.service';
  import { EspecieService } from './../../../../servicios/especie.service';
  import { IEspecie } from './../../../../modelo/especie-interface';
  import { IRaza } from './../../../../modelo/raza-interface';
  import { IFicha, IFichaCliente, IFichaDoctorSolicitante, IFichaEspecie, IFichaExamen, IFichaRaza, IFichaUsuarioAsignado } from './../../../../modelo/ficha-interface';
  import { FichaService } from './../../../../servicios/ficha.service';
import { IDoctorSolicitante } from './../../../../modelo/doctorSolicitante-interface';
import { DoctorSolicitanteService } from './../../../../servicios/doctor-solicitante.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';


@Component({
  selector: 'app-agrega-ficha',
  templateUrl: './agrega-ficha.component.html',
  styleUrls: ['./agrega-ficha.component.css']
})
export class AgregaFichaComponent implements OnInit {


    cliente!: IFichaCliente;
    examen!: IFichaExamen;
    examenDato!: IExamen | undefined;
    especie!: IFichaEspecie;
    raza!: IFichaRaza;
    doctorSolicitante!: IFichaDoctorSolicitante;
    usuarioAsignado!:IFichaUsuarioAsignado;

    usuario: string;
    form!: FormGroup;
    datoExamen!: IExamen[];
    datoUsuario!: IUsuario[];
    datoCliente!: ICliente[];
    datoFicha!: IFicha;
    datoDoctorSolicitante!:IDoctorSolicitante[];

    datoEspecie!: IEspecie[];
    datoRaza!: IRaza[];

    fechaActual: Date = new Date();

    datoSexo = [{ nombre: 'Hembra', id: 'Hembra'}, { nombre: 'Macho', id: 'Macho'}];



    visibleHemograma= false;
    visibleExamen1= false;
    visibleExamen2= false;

    flagGraba=0;
    respuesta=3;

    constructor(private dialogRef: MatDialogRef<AgregaFichaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private examenService: ExamenService,
                private usuarioLabService: UsuarioLabService,
                private clienteService: ClienteService,
                private especieService: EspecieService,
                private razaService: RazaService,
                private doctorSolicitanteService: DoctorSolicitanteService,
                private fichaService: FichaService,
                ) {

                  this.usuario = data.usuario;
                  this.cargaCliente();
                  this.cargaExamen();
                  this.cargaUsuario();
                  this.cargaEspecie();
                  this.cargaRaza();
      }

      idCliente= new FormControl('', [Validators.required]);
      nombrePropietario= new FormControl('', [Validators.required]);
      nombrePaciente= new FormControl('', [Validators.required]);
      idEspecie= new FormControl('', [Validators.required]);
      idRaza= new FormControl('', [Validators.required]);
      edad= new FormControl('', [Validators.required]);
      sexo= new FormControl('', [Validators.required]);
      idDoctorSolicitante= new FormControl('', [Validators.required]);
      flagExamen= new FormControl('',[Validators.required]);
      hemograma= new FormControl('');
      examen1= new FormControl('');
      examen2= new FormControl('');
      idUsuarioHemograma= new FormControl('');
      idUsuarioExamen1= new FormControl('');
      idUsuarioExamen2= new FormControl('');


      agregaFicha: FormGroup = new FormGroup({
                    idCliente: this.idCliente,
                    nombrePropietario: this.nombrePropietario,
                    nombrePaciente: this.nombrePaciente,
                    idEspecie: this.idEspecie,
                    idRaza: this.idRaza,
                    edad: this.edad,
                    sexo: this.sexo,
                    idDoctorSolicitante: this.idDoctorSolicitante,
                    flagExamen:this.flagExamen,
                    hemograma: this.hemograma,
                    examen1: this.examen1,
                    examen2: this.examen2,
                    idUsuarioHemograma: this.idUsuarioHemograma,
                    idUsuarioExamen1: this.idUsuarioExamen1,
                    idUsuarioExamen2: this.idUsuarioExamen2
      });

      getErrorMessage(campo: string) {

                    if (campo === 'idCliente'){
                      return this.idCliente.hasError('required') ? 'Debes Seleccionar Cliente' : '';
                    }
                    if (campo === 'nombrePropietario'){
                      return this.nombrePropietario.hasError('required') ? 'Debes ingresar Nombre Propietario' : '';
                    }
                    if (campo === 'nombrePaciente'){
                      return this.nombrePaciente.hasError('required') ? 'Debes ingresar Nombre Paciente' : '';
                    }
                    if (campo === 'idEspecie'){
                      return this.idEspecie.hasError('required') ? 'Debes Seleccionar Especie' : '';
                    }
                    if (campo === 'idRaza'){
                      return this.idRaza.hasError('required') ? 'Debes Seleccionar Raza' : '';
                    }
                    if (campo === 'edad'){
                      return this.edad.hasError('required') ? 'Debes Ingresar Edad' : '';
                    }
                    if (campo === 'sexo'){
                      return this.sexo.hasError('required') ? 'Debes Seleccionar Sexo' : '';
                    }
                    if (campo === 'idDoctorSolicitante'){
                      return this.idDoctorSolicitante.hasError('required') ? 'Debes Ingresar Dr. Solicitante' : '';
                    }

                    return '';
                  }

    ngOnInit() {

    }

    cargaExamen(){
      this.examenService
      .getDataExamen(this.data.empresa_Id)
      .subscribe(res => {
        console.log('examen:', res['data'])
        this.datoExamen = res['data'] as any[];
      //  for (var x of this.datoExamen) {
       //   console.log(x)
       // }
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

    cargaUsuario(){
      this.usuarioLabService
      .getDataUsuario(this.data.empresa_Id)
      .subscribe(res => {
        console.log('usuario:', res['data']);
        this.datoUsuario = res['data'] as any[] ;
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

    cargaCliente(){
      this.clienteService
      .getDataCliente(this.data.empresa_Id)
      .subscribe(res => {
        console.log('cliente:', res['data'])
        this.datoCliente = res['data'] ;
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

    cargaEspecie(){
      this.especieService
      .getDataEspecie(this.data.empresa_Id)
      .subscribe(res => {
        console.log('especie:', res['data']);
        this.datoEspecie = res['data'] as any[];
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

    cargaClienteDoctorSolicitante(idCliente:any){
      this.doctorSolicitanteService
      .getDataClienteDoctorSolicitante(idCliente)
      .subscribe(res => {
        console.log('dr solicitante:', res['data']);
        this.datoDoctorSolicitante = res['data'] as any[];
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

    cargaRaza(){
      this.razaService
      .getDataRaza(this.data.empresa_Id)
      .subscribe(res => {
        console.log('raza:', res['data']);
        this.datoRaza = res['data'] as any[];
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
    seleccionaUsuario(p: any){
      return;
    }

    async seleccionaCliente(p: any){
     await this.cargaClienteDoctorSolicitante(p._id)
      return;
    }

    chkHemograma(event:boolean){
      console.log('valor chk:',event);
      if (event)
          this.visibleHemograma=true
      else
        this.visibleHemograma=false

      this.validaExamen();
    }

    chkExamen1(event:boolean){
      console.log('valor chk:',event);
      if (event)
          this.visibleExamen1=true
      else
        this.visibleExamen1=false

      this.validaExamen();
    }

    chkExamen2(event:boolean){
      console.log('valor chk:',event);
      if (event)
          this.visibleExamen2=true
      else
        this.visibleExamen2=false

        this.validaExamen();
    }


    validaExamen(){
      if (this.visibleHemograma || this.visibleExamen1 || this.visibleExamen2){
        this.agregaFicha.get('flagExamen')!.clearValidators();
      }
      else{
        this.agregaFicha.get('flagExamen')!.setValidators([Validators.required]);
      }
      this.agregaFicha.get('flagExamen')!.updateValueAndValidity();
    }

    async enviar() {

        /*Permite ingresar con recursividad por lo de asyncrono*/
        console.log('examen seleccionado',this.datoExamen)
        console.log('hemo',this.visibleHemograma);
        if (this.visibleHemograma ){
            console.log('paso hemo')
            this.examenDato= this.datoExamen.find(valor => valor.codigoInterno == 1);
            console.log('paso hemo2',this.examenDato)
            this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioHemograma')!.value,1,2)
            console.log('paso hemo3')
        }else{
          if (this.visibleExamen1 ){
            this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno==2)
             this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioExamen1')!.value,1,3)
         }else{
          if (this.visibleExamen2 ){
             this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno==3)
             this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioExamen2')!.value,1,4)
          }
        }
    }
  }


  grabar(examenEncontrado:any,UsuarioIngresado:any, flag:any,codigoInterno:any){
      if (flag!=0){

        // console.log(x)
        console.log('examen:',examenEncontrado);
          this.examen= {
            idExamen: examenEncontrado._id,
            codigoExamen: examenEncontrado.codigoExamen,
            nombre: examenEncontrado.nombre
      //   }
        }


        this.usuarioAsignado={
          idUsuario: UsuarioIngresado._id,
          usuario: UsuarioIngresado.usuario,
          rutUsuario: UsuarioIngresado.rutUsuario,
          nombreCompleto: UsuarioIngresado.nombres + ' ' + UsuarioIngresado.apellidoPaterno + ' ' + UsuarioIngresado.apellidoMaterno
        }

        this.cliente= {
          idCliente:this.agregaFicha.get('idCliente')!.value._id,
          rutCliente: this.agregaFicha.get('idCliente')!.value.rutCliente,
          razonSocial: this.agregaFicha.get('idCliente')!.value.razonSocial,
          nombreFantasia: this.agregaFicha.get('idCliente')!.value.nombreFantasia
        }

        this.especie= {
          idEspecie: this.agregaFicha.get('idEspecie')!.value._id,
          nombre: this.agregaFicha.get('idEspecie')!.value.nombre.toUpperCase()
        }

        this.raza= {
          idRaza: this.agregaFicha.get('idRaza')!.value._id,
          nombre: this.agregaFicha.get('idRaza')!.value.nombre.toUpperCase()
        }

        this.doctorSolicitante= {
          idDoctorSolicitante: this.agregaFicha.get('idDoctorSolicitante')!.value._id,
          nombreDoctorSolicitante: this.agregaFicha.get('idDoctorSolicitante')!.value.nombre.toUpperCase()
        }

        this.datoFicha = {
          fichaC: {
                cliente: this.cliente,
                nombrePropietario: this.agregaFicha.get('nombrePropietario')!.value.toUpperCase(),
                nombrePaciente: this.agregaFicha.get('nombrePaciente')!.value.toUpperCase(),
                edadPaciente: this.agregaFicha.get('edad')!.value,
                especie: this.especie,
                raza: this.raza,
                sexo: this.agregaFicha.get('sexo')!.value.toUpperCase(),
                doctorSolicitante: this.doctorSolicitante,
                examen:this.examen
          },
        usuarioAsignado:this.usuarioAsignado,
        empresa:{
          empresa_Id: this.data.empresa_Id,
          rutEmpresa: this.data.rutEmpresa
        },
        usuarioCrea_id: this.usuario,
        usuarioModifica_id: this.usuario,

        };
      }
      console.log('ficha:',this.datoFicha)
       this.fichaService.postDataFicha(this.datoFicha)
      .subscribe(
        dato => {
          if (dato.codigo === 200) {

            if (this.visibleHemograma && codigoInterno<=1){
                this.examenDato!= this.datoExamen.find(valor=> valor.codigoInterno==1);
                this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioHemograma')!.value,1,2)
            }else{
              if (this.visibleExamen1 && codigoInterno<=2){
                this.examenDato!= this.datoExamen.find(valor=> valor.codigoInterno==2)
                 this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioExamen1')!.value,1,3)
             }else{
              if (this.visibleExamen2 && codigoInterno<=3){
                 this.examenDato!= this.datoExamen.find(valor=> valor.codigoInterno==3)
                 this.grabar(this.examenDato,this.agregaFicha.get('idUsuarioExamen2')!.value,1,4)
              }else{
                Swal.fire(
                  'Se agregó con Éxito',
                  '',
                  'success'
                ); // ,
                  this.dialogRef.close(1);

              }
             }
            }

          }else{

            if (dato.codigo!=500){
                Swal.fire(
                  dato.mensaje,
                  'Click en Botón!',
                  'error'
                );
            }
            else{
              console.log('Error Ficha:', dato);
              Swal.fire(
                '',
                'ERROR SISTEMA',
                'error'
              );
            }
            this.respuesta=  1;
          }

        }
      );
  }
    // Error handling


    cerrar() {
     // this.dialogRef.close();
    }
  }


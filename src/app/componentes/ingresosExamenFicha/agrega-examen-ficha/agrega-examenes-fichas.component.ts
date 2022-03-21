import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICliente } from './../../../modelo/cliente-interface';
import { IExamen } from './../../../modelo/examen-interface';
import { IUsuario } from './../../../modelo/usuario-interface';
import { ClienteService } from './../../../servicios/cliente.service';
import { ExamenService } from './../../../servicios/examen.service';


import Swal from 'sweetalert2';
import { RazaService } from './../../../servicios/raza.service';
import { EspecieService } from './../../../servicios/especie.service';
import { IEspecie } from './../../../modelo/especie-interface';
import { IRaza } from './../../../modelo/raza-interface';
import { IFicha } from './../../../modelo/ficha-interface';
import { FichaService } from './../../../servicios/ficha.service';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';

@Component({
  selector: 'app-agrega-examenes-fichas',
  templateUrl: './agrega-examenes-fichas.component.html',
  styleUrls: ['./agrega-examenes-fichas.component.css']
})
export class AgregaExamenesFichasComponent implements OnInit {

  cliente!: {
    idCliente?:string;
    rutCliente?: string;
    razonSocial?: string;
    nombreFantasia?: string;
  }

  examen!: {
    idExamen:string;
    codigoExamen: string;
    nombre: string;
  }

  especie!: {
    idEspecie:string;
    nombre: string;
  }

  raza!: {
    idRaza:string;
    nombre: string;
  }

  usuario: string;
  form!: FormGroup;
  datoExamen!: IExamen[];
  datoUsuario!: IUsuario[];
  datoCliente!: ICliente[];
  datoFicha!: IFicha;

  datoEspecie!: IEspecie[];
  datoRaza!: IRaza[];

  fechaActual: Date = new Date();

  datoSexo = [{ nombre: 'Hembra', id: 'Hembra'}, { nombre: 'Macho', id: 'Macho'}];

  hemograma=false;

  constructor(private dialogRef: MatDialogRef<AgregaExamenesFichasComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private examenService: ExamenService,
              private usuarioLabService: UsuarioLabService,
              private clienteService: ClienteService,
              private especieService: EspecieService,
              private razaService: RazaService,
              private fichaService: FichaService
              ) {
                this.usuario = data.usuario;
                this.cargaCliente();
                this.cargaExamen();
                this.cargaUsuario();
                this.cargaEspecie();
                this.cargaRaza();
    }

    idUsuario = new FormControl('', [Validators.required]);
    idCliente= new FormControl('', [Validators.required]);
    idExamen= new FormControl('', [Validators.required]);
    nombrePropietario= new FormControl('', [Validators.required]);
    nombrePaciente= new FormControl('', [Validators.required]);
    idEspecie= new FormControl('', [Validators.required]);
    idRaza= new FormControl('', [Validators.required]);
    edad= new FormControl('', [Validators.required]);
    sexo= new FormControl('', [Validators.required]);
    docSolicitante= new FormControl('', [Validators.required]);

    agregaCabeceraExamen: FormGroup = new FormGroup({
                  idUsuario: this.idUsuario,
                  idCliente: this.idCliente,
                  idExamen: this.idExamen,
                  nombrePropietario: this.nombrePropietario,
                  nombrePaciente: this.nombrePaciente,
                  idEspecie: this.idEspecie,
                  idRaza: this.idRaza,
                  edad: this.edad,
                  sexo: this.sexo,
                  docSolicitante: this.docSolicitante
    });

    getErrorMessage(campo: string) {
                  if (campo === 'idUsuario'){
                      return this.idUsuario.hasError('required') ? 'Debes Seleccionar Usuario' : '';
                  }
                  if (campo === 'idCliente'){
                    return this.idCliente.hasError('required') ? 'Debes Seleccionar Cliente' : '';
                  }
                  if (campo === 'idExamen'){
                    return this.idExamen.hasError('required') ? 'Debes Seleccionar Exámen' : '';
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
                  if (campo === 'docSolicitante'){
                    return this.docSolicitante.hasError('required') ? 'Debes Ingresar Dr. Solicitante' : '';
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
      this.datoExamen = res['data'] ;
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
      console.log('usuario:', res['data'])
      this.datoUsuario = res['data'] ;
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
      console.log('especie:', res['data'])
      this.datoEspecie = res['data'] ;
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
      console.log('raza:', res['data'])
      this.datoRaza = res['data'] ;
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
  seleccionaUsuario(p:any){
    return;
  }

  seleccionaExamen(p:any){
    if (p.nombre.toUpperCase()=="HEMOGRAMA")
        this.hemograma=true;
    /*
    console.log('datos examen selec:',p)
    this.examen= {
      idExamen:p._id,
      codigoExamen: p.codigoExamen,
      nombre: p.nombre
    }
    */
   this.enviar()
    return;
  }

  seleccionaCliente(p:any){
    /*
    this.cliente= {
      idCliente:p._id,
      rutCliente: p.rutCliente,
      razonSocial: p.razonSocial,
      nombreFantasia: p.nombreFantasia
    }
    */
    return;
  }


  enviar() {

    console.log('examen:',this.agregaCabeceraExamen.get('idExamen')!.value.codigoExamen)
    console.log('cliente:',this.agregaCabeceraExamen.get('idCliente')!.value)

    this.examen= {
      idExamen: this.agregaCabeceraExamen.get('idExamen')!.value._id,
      codigoExamen: this.agregaCabeceraExamen.get('idExamen')!.value.codigoExamen,
      nombre: this.agregaCabeceraExamen.get('idExamen')!.value.nombre
    }

    this.cliente= {
      idCliente:this.agregaCabeceraExamen.get('idCliente')!.value._id,
      rutCliente: this.agregaCabeceraExamen.get('idCliente')!.value.rutCliente,
      razonSocial: this.agregaCabeceraExamen.get('idCliente')!.value.razonSocial,
      nombreFantasia: this.agregaCabeceraExamen.get('idCliente')!.value.nombreFantasia
    }

    this.especie= {
      idEspecie: this.agregaCabeceraExamen.get('idEspecie')!.value._id,
      nombre: this.agregaCabeceraExamen.get('idEspecie')!.value.nombre.toUpperCase()
    }

    this.raza= {
      idRaza: this.agregaCabeceraExamen.get('idRaza')!.value._id,
      nombre: this.agregaCabeceraExamen.get('idRaza')!.value.nombre.toUpperCase()
    }
/**
    this.datoFicha = {

  cliente: this.cliente,
  nombrePropietario: this.agregaCabeceraExamen.get('nombrePropietario').value.toUpperCase(),
  nombrePaciente: this.agregaCabeceraExamen.get('nombrePaciente').value.toUpperCase(),
  edadPaciente: this.agregaCabeceraExamen.get('edad').value,
  especie: this.especie,
  raza: this.raza,
  sexo: this.agregaCabeceraExamen.get('sexo').value.toUpperCase(),
  doctorSolicitante: this.agregaCabeceraExamen.get('docSolicitante').value.toUpperCase(),
  examen:this.examen,
  telefono: null,
  email: null,
  usuarioCrea_id: this.usuario,
  usuarioModifica_id: this.usuario,

  };
*/
/// console.log('agrega 1:', this.datoFicha);
/*
  this.fichaService.postDataFicha(this.datoFicha)
  .subscribe(
    dato => {
      console.log('respuesta:', dato.codigo);
      if (dato.codigo === 200) {
          Swal.fire(
          'Se agregó con Éxito',
          'Click en Botón!',
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
*/

  }

  // Error handling


  cerrar() {
   // this.dialogRef.close();
  }
}


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

import { AuthenticationService } from './../../../../autentica/_services';
import { JwtResponseI } from './../../../../autentica/_models';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';


@Component({
  selector: 'app-modifica-ficha',
  templateUrl: './modifica-ficha.component.html',
  styleUrls: ['./modifica-ficha.component.css']
})
export class ModificaFichaComponent implements OnInit {

    currentUsuario!: JwtResponseI;


    cliente!: IFichaCliente;
    examen!: IFichaExamen;
    examenDato!: IExamen;
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

    constructor(private dialogRef: MatDialogRef<ModificaFichaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private examenService: ExamenService,
                private usuarioLabService: UsuarioLabService,
                private clienteService: ClienteService,
                private especieService: EspecieService,
                private razaService: RazaService,
                private doctorSolicitanteService: DoctorSolicitanteService,
                private fichaService: FichaService,
                private authenticationService: AuthenticationService
                ) {
                  this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);

                  console.log('data:',this.data);
                  this.usuario = data.usuario;
                  this.cargaCliente();
                  this.cargaClienteDoctorSolicitante(this.data.fichaC.cliente.idCliente)
                  this.cargaExamen();
                  this.cargaUsuario();
                  this.cargaEspecie();
                  this.cargaRaza();
      }



      idCliente= new FormControl(this.data.fichaC.cliente, [Validators.required]);
      nombrePropietario= new FormControl(this.data.fichaC.nombrePropietario, [Validators.required]);
      nombrePaciente= new FormControl(this.data.fichaC.nombrePaciente, [Validators.required]);
      idEspecie= new FormControl(this.data.fichaC.especie, [Validators.required]);
      idRaza= new FormControl(this.data.fichaC.raza, [Validators.required]);
      edad= new FormControl(this.data.fichaC.edadPaciente, [Validators.required]);
      sexo= new FormControl(this.data.fichaC.sexo, [Validators.required]);
      idDoctorSolicitante= new FormControl(this.data.fichaC.doctorSolicitante, [Validators.required]);
      idExamen= new FormControl(this.data.fichaC.examen,[Validators.required]);
      idUsuario= new FormControl(this.data.usuarioAsignado);



      modificaFicha: FormGroup = new FormGroup({
                    idCliente: this.idCliente,
                    nombrePropietario: this.nombrePropietario,
                    nombrePaciente: this.nombrePaciente,
                    idEspecie: this.idEspecie,
                    idRaza: this.idRaza,
                    edad: this.edad,
                    sexo: this.sexo,
                    idDoctorSolicitante: this.idDoctorSolicitante,
                    idExamen:this.idExamen,
                    idUsuario: this.idUsuario
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
                    if (campo === 'idExamen'){
                      return this.idExamen.hasError('required') ? 'Debes Ingresar Exámen' : '';
                    }
                    return '';
                  }

    ngOnInit() {


    }

    cargaExamen(){
      this.examenService
      .getDataExamenTodo(this.data.empresa.empresa_Id)
      .subscribe(res => {
        console.log('examen:', res['data']);
        this.datoExamen = res['data'] as any[] ;
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
      .getDataUsuario(this.data.empresa.empresa_Id,'Laboratorio')
      .subscribe(res => {
        console.log('usuario:', res['data']);
        this.datoUsuario = res['data'] as any[];
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
      .getDataCliente(this.data.empresa.empresa_Id)
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
      .getDataEspecieTodo(this.data.empresa.empresa_Id)
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

    cargaClienteDoctorSolicitante(idCliente:string){
      this.doctorSolicitanteService
      .getDataClienteDoctorSolicitante(idCliente)
      .subscribe(res => {
        console.log('dr solicitante:', res['data'])
        this.datoDoctorSolicitante = res['data'] ;
        let idDoctorSolicitante_:string;
        if (this.modificaFicha.get('idDoctorSolicitante')!.value._id==undefined){
          idDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value.idDoctorSolicitante;
        }
        else{
          idDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value._id;
        }

        const buscaDoctor= this.datoDoctorSolicitante.find(valor=> valor._id==idDoctorSolicitante_)

        if (buscaDoctor==undefined){
          this.modificaFicha.get('idDoctorSolicitante')!.setValue('');
        }
        console.log('paso4:',buscaDoctor);
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
      .getDataRazaTodo(this.data.empresa.empresa_Id)
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

    async seleccionaExamen(p:any){

  /*    if (p.nombre.toUpperCase()=="HEMOGRAMA")
          this.hemograma=true;

      console.log('datos examen selec:',p)
      this.examen= {
        idExamen:p._id,
        codigoExamen: p.codigoExamen,
        nombre: p.nombre
      }

     this.enviar()
     */
      return;
    }

    async seleccionaCliente(p:any){
      console.log('cliente',p)
     await this.cargaClienteDoctorSolicitante(p._id)
      return;
    }




  enviar(){

        // console.log(x)
        console.log('paso-2');
        let examen_:string;
        if (this.modificaFicha.get('idExamen')!.value._id==undefined)
          examen_=this.modificaFicha.get('idExamen')!.value.idExamen;
        else
          examen_=this.modificaFicha.get('idExamen')!.value._id;

        this.examen= {
            idExamen: examen_,
            codigoExamen: this.modificaFicha.get('idExamen')!.value.codigoExamen,
            nombre: this.modificaFicha.get('idExamen')!.value.nombre,
            nombreExamen: this.modificaFicha.get('idExamen')!.value.nombreExamen
      //   }
        }
        console.log('paso-1');
        let idUsuario_:string;
        if (this.modificaFicha.get('idUsuario')!.value._id==undefined)
          idUsuario_=this.modificaFicha.get('idUsuario')!.value.idUsuario;
        else
          idUsuario_=this.modificaFicha.get('idUsuario')!.value._id;

        this.usuarioAsignado={
          idUsuario: idUsuario_,
          usuario: this.modificaFicha.get('idUsuario')!.value.usuario,
          rutUsuario: this.modificaFicha.get('idUsuario')!.value.rutUsuario,
          nombreCompleto: this.modificaFicha.get('idUsuario')!.value.nombres + ' ' + this.modificaFicha.get('idUsuario')!.value.apellidoPaterno + ' ' + this.modificaFicha.get('idUsuario')!.value.apellidoMaterno
        }
        console.log('paso0');
        let idCliente_:string;
        if (this.modificaFicha.get('idCliente')!.value._id==undefined)
          idCliente_=this.modificaFicha.get('idCliente')!.value.idCliente;
        else
          idCliente_=this.modificaFicha.get('idCliente')!.value._id;

        this.cliente= {
          idCliente: idCliente_,
          rutCliente: this.modificaFicha.get('idCliente')!.value.rutCliente,
          razonSocial: this.modificaFicha.get('idCliente')!.value.razonSocial,
          nombreFantasia: this.modificaFicha.get('idCliente')!.value.nombreFantasia,
          correoEnvioCliente: this.modificaFicha.get('idCliente')!.value.emailEnvioExamenCliente
        }
        console.log('paso1');
        let idEspecie_:string;
        if (this.modificaFicha.get('idEspecie')!.value._id==undefined)
          idEspecie_=this.modificaFicha.get('idEspecie')!.value.idEspecie;
        else
          idEspecie_=this.modificaFicha.get('idEspecie')!.value._id;

        this.especie= {
          idEspecie: idEspecie_,
          nombre: this.modificaFicha.get('idEspecie')!.value.nombre
        }
        console.log('paso2');
        let idRaza_:string;
        if (this.modificaFicha.get('idRaza')!.value._id==undefined)
          idRaza_=this.modificaFicha.get('idRaza')!.value.idRaza;
        else
          idRaza_=this.modificaFicha.get('idRaza')!.value._id;

        this.raza= {
          idRaza: idRaza_,
          nombre: this.modificaFicha.get('idRaza')!.value.nombre
        }
        console.log('paso3',this.modificaFicha.get('idDoctorSolicitante')!.value);

        ;

        let idDoctorSolicitante_:string;
        let nombreDoctorSolicitante_:string;
        if (this.modificaFicha.get('idDoctorSolicitante')!.value._id==undefined){
          idDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value.idDoctorSolicitante;
          nombreDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value.nombreDoctorSolicitante;
        }
        else{
          idDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value._id;
          nombreDoctorSolicitante_=this.modificaFicha.get('idDoctorSolicitante')!.value.nombre;
        }

        this.doctorSolicitante= {
          idDoctorSolicitante: idDoctorSolicitante_,
          nombreDoctorSolicitante: nombreDoctorSolicitante_
        }



        this.datoFicha = {
          _id:this.data._id,
          fichaC: {
                cliente: this.cliente,
                nombrePropietario: this.modificaFicha.get('nombrePropietario')!.value,
                nombrePaciente: this.modificaFicha.get('nombrePaciente')!.value,
                edadPaciente: this.modificaFicha.get('edad')!.value,
                especie: this.especie,
                raza: this.raza,
                sexo: this.modificaFicha.get('sexo')!.value,
                doctorSolicitante: this.doctorSolicitante,
                examen:this.examen,
                numeroFicha:this.data.fichaC.numeroFicha
          },
        usuarioAsignado:this.usuarioAsignado,
    //   empresa_Id: this.data.empresa_Id,
        usuarioModifica_id: this.currentUsuario.usuarioDato._id,

        };


      console.log('dato ficha:',this.datoFicha)
       this.fichaService.putDataFicha(this.datoFicha)
      .subscribe(
        dato => {
          if (dato.codigo === 200) {


                Swal.fire(
                  'Se agregó con Éxito',
                  'Click en Botón!',
                  'success'
                ); // ,
                  this.dialogRef.close(1);
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
          }

        }
      );
  }
    // Error handling


    cerrar() {
     // this.dialogRef.close();
    }

    comparaSeleccionaCliente(v1: any, v2: any): boolean {

      return v1._id===v2.idCliente;
    }

    comparaSeleccionaEspecie(v1: any, v2: any): boolean {

      return v1._id===v2.idEspecie;
    }

    comparaSeleccionaRaza(v1: any, v2: any): boolean {

      return v1._id===v2.idRaza;
    }

    comparaSeleccionaDoctorSolicitante(v1: any, v2: any): boolean {

      return v1._id===v2.idDoctorSolicitante;
    }

    comparaSeleccionaExamen(v1: any, v2: any): boolean {

      return v1._id===v2.idExamen;
    }

    comparaSeleccionaUsuarioResponsable(v1: any, v2: any): boolean {

      return v1._id===v2.idUsuario;
    }


    comparaSeleccionaSexo(v1: any, v2: any): boolean {
      console.log('v1:',v1.toUpperCase());
      console.log('v2:',v2.toUpperCase());
      return  v1.toUpperCase()===v2.toUpperCase();
    }

  }





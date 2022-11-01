import { Component, OnInit, Inject } from '@angular/core';
  import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { formatRut, RutFormat, validateRut } from "@fdograph/rut-utilities";

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
  import { IFicha, IFichaCliente, IFichaDoctorSolicitante, IFichaEspecie, IFichaExamen, IFichaRaza, IFichaUsuarioAsignado, IFichaValidador, IIngresadoPor } from './../../../../modelo/ficha-interface';
  import { FichaService } from './../../../../servicios/ficha.service';
import { IDoctorSolicitante } from './../../../../modelo/doctorSolicitante-interface';
import { DoctorSolicitanteService } from './../../../../servicios/doctor-solicitante.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import { EmpresaService } from '@app/servicios/empresa.service';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { ValidadorService } from '@app/servicios/validador.service';
import { IValidador } from '@app/modelo/validador-interface';
import { PropietarioService } from '@app/servicios/propietario.service';

/*Ese modulo es llamado por Laboratorio y veterinario por lo que tiene varias restricciones dependiendo de quien lo llame*/
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

    validadorAsignado!:IFichaValidador;
    validador!: IValidador;

    usuario: string;
    form!: UntypedFormGroup;
    datoExamen!: IExamen[];
    datoUsuario!: IUsuario[];
    datoCliente!: ICliente[];
    datoEmpresa!: IEmpresa[];
    datoValidador!: IValidador[];

    datoFicha!: IFicha;
    datoDoctorSolicitante!:IDoctorSolicitante[];

    datoEspecie!: IEspecie[];
    datoRaza!: IRaza[];
    IIngresadoPor!: IIngresadoPor;

    fechaActual: Date = new Date();

    datoSexo = [{ nombre: 'Hembra', id: 'Hembra'}, { nombre: 'Macho', id: 'Macho'}];



    visibleHemograma= false;
    visiblePerfilBioquimico= false;
    visiblePruebasDeCoagulacion= false;

    flagHemograma= false;
    flagPerfilBioquimico= false;
    flagPruebasDeCoagulacion= false;

    flagGraba=0;
    respuesta=3;

    numeroFichaCorrelativo:number=0;
    nombreLogo='sinLogo.jpg';

    tipoEmpresa='';
    razonSocial= '';
    nombreFantasia= '';
    tituloBoton='';
    estadoFicha_=''
    constructor(private dialogRef: MatDialogRef<AgregaFichaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private empresaService: EmpresaService,
                private examenService: ExamenService,
                private validadorService: ValidadorService,
                private usuarioLabService: UsuarioLabService,
                private propietarioService: PropietarioService,
                private clienteService: ClienteService,
                private especieService: EspecieService,
                private razaService: RazaService,
                private doctorSolicitanteService: DoctorSolicitanteService,
                private fichaService: FichaService,
                ) {
                  console.log('data:',data)
                  this.tipoEmpresa = data.tipoEmpresa;
                  this.usuario = data.usuario;
                  if (this.data.tipoEmpresa=='Veterinaria'){
                    this.estadoFicha_='Solicitado';
                    this.tituloBoton='Enviar';
                    this.cargaEmpresasCliente();
                  }else{
                    this.estadoFicha_='Ingresado';
                    this.tituloBoton='Grabar'
                    this.cargaCliente();
                  }
                  this.cargaExamen();
                  this.cargaUsuarioLaboratorio();
                  this.cargaEspecie();
                  this.cargaValidador();
                 // this.cargaRaza();
      }

      idCliente= new UntypedFormControl('', [Validators.required]);
      idEmpresa= new UntypedFormControl('', [Validators.required]);
      rutPropietario = new UntypedFormControl('');
      nombrePropietario= new UntypedFormControl('');
      nombrePaciente= new UntypedFormControl('', [Validators.required]);
      idEspecie= new UntypedFormControl('', [Validators.required]);
      idRaza= new UntypedFormControl('', [Validators.required]);
      edad= new UntypedFormControl('', [Validators.required]);
      sexo= new UntypedFormControl('', [Validators.required]);
      idDoctorSolicitante= new UntypedFormControl('', [Validators.required]);
      correoClienteFinal = new UntypedFormControl('', [Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]);
      flagExamen= new UntypedFormControl('',[Validators.required]);
      hemograma= new UntypedFormControl('');
      perfilBioquimico= new UntypedFormControl('');
      pruebasDeCoagulacion= new UntypedFormControl('');
      idUsuarioHemograma= new UntypedFormControl('');
      idUsuarioPerfilBioquimico= new UntypedFormControl('');
      idUsuarioPruebasDeCoagulacion= new UntypedFormControl('');

      idValidadorHemograma= new UntypedFormControl('');
      idValidadorPerfilBioquimico=new UntypedFormControl('');
      idValidadorPruebasDeCoagulacion= new UntypedFormControl('');

      agregaFicha: UntypedFormGroup = new UntypedFormGroup({
                    idCliente: this.idCliente,
                    idEmpresa: this.idEmpresa,
                    rutPropietario: this.rutPropietario,
                    nombrePropietario: this.nombrePropietario,
                    nombrePaciente: this.nombrePaciente,
                    idEspecie: this.idEspecie,
                    idRaza: this.idRaza,
                    edad: this.edad,
                    sexo: this.sexo,
                    idDoctorSolicitante: this.idDoctorSolicitante,
                    correoClienteFinal: this.correoClienteFinal,
                    flagExamen:this.flagExamen,
                    hemograma: this.hemograma,
                    perfilBioquimico: this.perfilBioquimico,
                    pruebasDeCoagulacion: this.pruebasDeCoagulacion,
                    idUsuarioHemograma: this.idUsuarioHemograma,
                    idUsuarioPerfilBioquimico: this.idUsuarioPerfilBioquimico,
                    idUsuarioPruebasDeCoagulacion: this.idUsuarioPruebasDeCoagulacion,

                    idValidadorHemograma: this.idValidadorHemograma,
                    idValidadorPerfilBioquimico: this.idValidadorPerfilBioquimico,
                    idValidadorPruebasDeCoagulacion: this.idValidadorPruebasDeCoagulacion
      });

      getErrorMessage(campo: string) {

                    if (campo === 'idCliente'){
                      return this.idCliente.hasError('required') ? 'Debes Seleccionar Cliente' : '';
                    }
                    if (campo === 'idEmpresa'){
                      return this.idEmpresa.hasError('required') ? 'Debes Seleccionar Laboratorio' : '';
                    }
                  /*  if (campo === 'nombrePropietario'){
                      return this.nombrePropietario.hasError('required') ? 'Debes ingresar Nombre Propietario' : '';
                    }*/
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

                    if (campo === 'idValidadorHemograma'){
                      return this.idValidadorHemograma.hasError('required') ? 'Debes Ingresar Validador' : '';
                    }
                    if (campo === 'idValidadorPerfilBioquimico'){
                      return this.idValidadorPerfilBioquimico.hasError('required') ? 'Debes Ingresar Validador' : '';
                    }
                    if (campo === 'idValidadorPruebasDeCoagulacion'){
                      return this.idValidadorPruebasDeCoagulacion.hasError('required') ? 'Debes Ingresar Validador' : '';
                    }
                    return '';
                  }

    async ngOnInit() {
      await this.getEmpresa();
      if (this.data.tipoEmpresa=='Veterinaria'){
        this.agregaFicha.get('idCliente')!.clearValidators();
        this.agregaFicha.get('idCliente')!.updateValueAndValidity();
        this.cargaClienteDoctorSolicitante(this.data.idCliente);
      }else{
        this.agregaFicha.get('idEmpresa')!.clearValidators();
        this.agregaFicha.get('idEmpresa')!.updateValueAndValidity();
      }
    }

    cargaExamen(){
      this.examenService
      .getDataExamenTodo(this.data.empresa_Id)
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

    cargaValidador(){
      this.validadorService
      .getDataValidadorTodo(this.data.empresa_Id)
      .subscribe(res => {
        console.log('validador:', res['data'])
        this.datoValidador = res['data'] as any[];
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

    getEmpresa(){
      this.empresaService
      .getDataEmpresa(this.data.empresa_Id)
      .subscribe(res => {
        console.log('logo empresa:', res['data'][0])
        this.nombreLogo = res['data'][0]?.nombreLogo;
        this.razonSocial= res['data'][0]?.razonSocial
        this.nombreFantasia= res['data'][0]?.nombreFantasia
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

    cargaUsuarioLaboratorio(){
      this.usuarioLabService
      .getDataUsuarioLaboratorio(this.data.empresa_Id)
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

    cargaEmpresasCliente(){
      console.log('íd cliente:',this.data.idCliente)
      this.clienteService
      .getDataEmpresasCliente(this.data.idCliente)
      .subscribe(res => {

        this.datoEmpresa = res['data'] ;
        console.log('dato empresa:', res['data'])

        /*
        for(let a=0; a<this.datoCliente.length; a++){
          // for(let b=0; b<this.datoClienteEmpresa[a].empresa!.length; b++){

            //  if (this.datoClienteEmpresa![a].empresa![a].empresa_Id != this.currentUsuario.usuarioDato.empresa.empresa_Id){
              this.datoCliente![a].empresa = this.datoCliente![a].empresa!.filter(x=> x.empresa_Id === this.data.empresa_Id)
            //  }
           // }
         }
         */
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

    cargaEmpresa(){
      this.empresaService
      .getDataEmpresa(this.data.empresa_Id)
      .subscribe(res => {
        console.log('logo empresa:', res['data'][0])
        this.nombreLogo = res['data'][0]?.nombreLogo;
        this.razonSocial= res['data'][0]?.razonSocial
        this.nombreFantasia= res['data'][0]?.nombreFantasia
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
      .getDataEspecieTodo(this.data.empresa_Id)
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
      console.log('id cliente:',idCliente)
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

    cargaRaza(nombreEspecie:string){
      console.log('empresa:',this.data.empresa_Id)
      console.log('especie:',nombreEspecie)
      this.razaService
      .getDataRazaTodoEspecie(this.data.empresa_Id,nombreEspecie)
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
      console.log('dats cliente:',p)
     await this.cargaClienteDoctorSolicitante(p._id)
      return;
    }


    async seleccionaEspecie(p: any){
      console.log('dats Especie:',p)
     await this.cargaRaza(p.nombre)
      return;
    }

    cargaPropietarioRut(rutPropietario:string){
      let nombrePropietario:string;
      this.propietarioService
      .getDataPropietarioRut(rutPropietario)
      .subscribe(res => {

        if (res['data'].length!=0){
          console.log('encontro propietario:', res['data']);
          nombrePropietario=res['data'][0].nombres
          console.log('nombre:',nombrePropietario);
          if(res['data'][0].apellidoPaterno!='.')
            nombrePropietario=nombrePropietario + " " + res['data'][0].nombrePropietario

          if(res['data'][0].apellidoMaterno!='.')
            nombrePropietario=nombrePropietario + " " + res['data'][0].nombreMropietario

          this.agregaFicha.get('nombrePropietario')!.setValue(nombrePropietario);
          this.agregaFicha.controls['nombrePropietario'].disable()
        }
        else{
          this.agregaFicha.controls['nombrePropietario'].enable()
          this.agregaFicha.get('nombrePropietario')!.setValue("");
        }
      //  this.datoRaza = res['data'] as any[];
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

    async chkHemograma(event:boolean){
      console.log('valor chk:',event);
      this.flagHemograma=event;
      console.log('flag:',this.flagHemograma);
      if (event && this.tipoEmpresa=='Laboratorio'){
           this.visibleHemograma=true;
      }else{
        this.visibleHemograma=false
      }
      this.validaValodadorHemograma();
      this.validaExamen();
    }

    chkPerfilBioquimico(event:boolean){
      console.log('valor chk:',event);
      this.flagPerfilBioquimico=event;
      if (event && this.tipoEmpresa=='Laboratorio')
          this.visiblePerfilBioquimico=true
      else
        this.visiblePerfilBioquimico=false

      this.validaValodadorPerfilBioquimico();
      this.validaExamen();
    }

    chkPruebasDeCoagulacion(event:boolean){
      console.log('valor chk:',event);
      this.flagPruebasDeCoagulacion=event;
      if (event && this.tipoEmpresa=='Laboratorio')
          this.visiblePruebasDeCoagulacion=true
      else
        this.visiblePruebasDeCoagulacion=false

      this.validaValodadorPruebasDeCoagulacion();
      this.validaExamen();
    }

    validaValodadorHemograma(){
      console.log('ValidadorHemograma:',this.visibleHemograma)
      if (this.visibleHemograma){
        console.log('paso activa');
        this.agregaFicha.get('idValidadorHemograma')!.setValidators([Validators.required]);
      }else{
        console.log('paso Inactiva');
        this.agregaFicha.get('idValidadorHemograma')!.clearValidators();
      }
      this.agregaFicha.get('idValidadorHemograma')!.updateValueAndValidity();
    }

    validaValodadorPerfilBioquimico(){
      console.log('visiblePerfilBioquimico:',this.visiblePerfilBioquimico)
      if (this.visiblePerfilBioquimico){
        this.agregaFicha.get('idValidadorPerfilBioquimico')!.setValidators([Validators.required]);
      }else{
        this.agregaFicha.get('idValidadorPerfilBioquimico')!.clearValidators();
      }
      this.agregaFicha.get('idValidadorPerfilBioquimico')!.updateValueAndValidity();
    }

    validaValodadorPruebasDeCoagulacion(){
      console.log('visiblePruebasDeCoagulacion:',this.visiblePruebasDeCoagulacion)
      if (this.visiblePruebasDeCoagulacion){
        this.agregaFicha.get('idValidadorPruebasDeCoagulacion')!.setValidators([Validators.required]);
      }else{
        this.agregaFicha.get('idValidadorPruebasDeCoagulacion')!.clearValidators();
      }
      this.agregaFicha.get('idValidadorPruebasDeCoagulacion')!.updateValueAndValidity();
    }

    validaExamen(){
      if (this.visibleHemograma || this.visiblePerfilBioquimico || this.visiblePruebasDeCoagulacion || this.tipoEmpresa!='Laboratorio'){
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
        console.log('hemo',this.flagHemograma);

        if (this.flagHemograma ){
            console.log('paso hemo')
            this.examenDato= this.datoExamen.find(valor => valor.codigoInterno == 1);
            console.log('paso hemo2',this.examenDato)

            this.grabar(this.examenDato,this.agregaFicha.get('idValidadorHemograma')!.value,this.agregaFicha.get('idUsuarioHemograma')!.value,1,2)
            console.log('paso hemo3')
        }else{
          if (this.flagPerfilBioquimico ){
            this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno==2)
             this.grabar(this.examenDato,this.agregaFicha.get('idValidadorPerfilBioquimico')!.value,this.agregaFicha.get('idUsuarioPerfilBioquimico')!.value,1,3)
         }else{
          if (this.flagPruebasDeCoagulacion ){
             this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno==3)
             this.grabar(this.examenDato,this.agregaFicha.get('idValidadorPruebasDeCoagulacion')!.value,this.agregaFicha.get('idUsuarioPruebasDeCoagulacion')!.value,1,4)
          }
        }
    }
  }


  grabar(examenEncontrado:any,validador: any,UsuarioIngresado:any, flag:any,valorIngreso:any){
    let empresa_;
    this.numeroFichaCorrelativo=this.numeroFichaCorrelativo+1;
    console.log('correlativo:',this.numeroFichaCorrelativo);

      if (flag!=0){
          console.log('examen:',examenEncontrado);
          this.examen= {
            idExamen: examenEncontrado._id,
            codigoExamen: examenEncontrado.codigoExamen,
            codigoInterno: examenEncontrado.codigoInterno,
            nombre: examenEncontrado.nombre,
            nombreExamen: examenEncontrado.nombreExamen,
            precioValor: examenEncontrado.precio,
            precioValorFinal: examenEncontrado.precio
          }

          if( UsuarioIngresado._id!=undefined){
            this.usuarioAsignado={
              idUsuario: UsuarioIngresado._id,
              usuario: UsuarioIngresado.usuario,
              rutUsuario: UsuarioIngresado.rutUsuario,
              nombreCompleto: UsuarioIngresado.nombres + ' ' + UsuarioIngresado.apellidoPaterno + ' ' + UsuarioIngresado.apellidoMaterno
            }
          }else{
              this.usuarioAsignado={
                idUsuario: '',
                usuario: '',
                rutUsuario: '',
                nombreCompleto: ''
              }
          }

          this.IIngresadoPor={
            tipoEmpresa:this.tipoEmpresa,            //Administrador, Laboratorio, Veterinaria
            idIngreso:this.data.datoIngreso._id,
            rutIngreso: this.data.datoIngreso.rutCliente,
            razonSocial: this.data.datoIngreso.razonSocial,
            nombreFantasia: this.data.datoIngreso.nombreFantasia
          }

          if (this.tipoEmpresa=='Veterinaria'){

            this.cliente= {
              idCliente:this.data.datoIngreso._id,
              rutCliente: this.data.datoIngreso.rutCliente,
              razonSocial: this.data.datoIngreso.razonSocial,
              nombreFantasia: this.data.datoIngreso.nombreFantasia,
              correoRecepcionCliente: this.data.datoIngreso.emailRecepcionExamenCliente
            }

            empresa_={
              empresa_Id: this.agregaFicha.get('idEmpresa')!.value._id,
              rutEmpresa: this.agregaFicha.get('idEmpresa')!.value.rutEmpresa,
              nombreLogo: this.agregaFicha.get('idEmpresa')!.value.nombreLogo
            }

          }else{
            this.cliente= {
              idCliente:this.agregaFicha.get('idCliente')!.value._id,
              rutCliente: this.agregaFicha.get('idCliente')!.value.rutCliente,
              razonSocial: this.agregaFicha.get('idCliente')!.value.empresa[0].razonSocial,
              nombreFantasia: this.agregaFicha.get('idCliente')!.value.empresa[0].nombreFantasia,
              correoRecepcionCliente: this.agregaFicha.get('idCliente')!.value.emailRecepcionExamenCliente
            }

            empresa_={
              empresa_Id: this.data.empresa_Id,
              rutEmpresa: this.data.rutEmpresa,
              nombreLogo: this.nombreLogo
            }
          }

        console.log('this.agregaFicha.get(idCliente)!.value',this.agregaFicha.get('idCliente')!.value);

        this.especie= {
          idEspecie: this.agregaFicha.get('idEspecie')!.value._id,
          nombre: this.agregaFicha.get('idEspecie')!.value.nombre
        }

        this.raza= {
          idRaza: this.agregaFicha.get('idRaza')!.value._id,
          nombre: this.agregaFicha.get('idRaza')!.value.nombre
        }

        this.doctorSolicitante= {
          idDoctorSolicitante: this.agregaFicha.get('idDoctorSolicitante')!.value._id,
          nombreDoctorSolicitante: this.agregaFicha.get('idDoctorSolicitante')!.value.nombre
        }

        console.log('validador:',validador._id)

        if( validador._id!=undefined){
          this.validadorAsignado={
            idValidador: validador._id,
            rutValidador: validador.rutValidador,
            nombres: validador.nombres,
            apellidoPaterno: validador.apellidoPaterno,
            apellidoMaterno: validador.apellidoMaterno,
            telefono: validador.telefono,
            profesion: validador.profesion,
            nombreFirma: validador.nombreFirma
          }
        }else{
          this.validadorAsignado={
            idValidador: '',
            rutValidador: '',
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            telefono: '',
            profesion: '',
            nombreFirma: ''
          }
        }


        this.datoFicha = {
          fichaC: {
                cliente: this.cliente,
                rutPropietario: this.agregaFicha.get('rutPropietario')!.value,
                nombrePropietario: this.agregaFicha.get('nombrePropietario')!.value,
                nombrePaciente: this.agregaFicha.get('nombrePaciente')!.value,
                edadPaciente: this.agregaFicha.get('edad')!.value,
                especie: this.especie,
                raza: this.raza,
                sexo: this.agregaFicha.get('sexo')!.value,
                doctorSolicitante: this.doctorSolicitante,
                correoClienteFinal: this.agregaFicha.get('correoClienteFinal')!.value,
                examen:this.examen,
                validador: this.validadorAsignado
          },
        usuarioAsignado:this.usuarioAsignado,

        empresa: empresa_,
        ingresadoPor:this.IIngresadoPor,
        facturacion:{
          fechaFacturacion:new Date('01/01/1900 00:00:00'),
          fechaPagoFacturacion:new Date('01/01/1900 00:00:00'),
        },
        estadoFicha: this.estadoFicha_,
        usuarioCrea_id: this.usuario,
        usuarioModifica_id: this.usuario,
        fechaHora_envia_crea: new Date('01/01/1900 00:00:00'),
        fechaHora_envia_modifica: new Date('01/01/1900 00:00:00'),
        fechaHora_recepciona_crea: new Date('01/01/1900 00:00:00')

        };
      }
      console.log('ficha:',this.datoFicha)
       this.fichaService.postDataFicha(this.datoFicha,this.numeroFichaCorrelativo)
      .subscribe(
        dato => {
          if (dato.codigo === 200) {
              console.log('this.numeroFichaCorrelativo:',this.numeroFichaCorrelativo)
              console.log('dato ficha res:',dato.data)
              console.log('examen dato:',this.datoExamen);
              console.log('visibleHemograma:',this.visibleHemograma)
            if (this.flagHemograma && valorIngreso<=1){
              console.log('pasooooooooooooooooooooooooooo1');
                this.examenDato!= this.datoExamen.find(valor=> valor.codigoInterno == 1);
                console.log('examen1:',this.examenDato);
                this.grabar(this.examenDato,this.agregaFicha.get('idValidadorHemograma')!.value,this.agregaFicha.get('idUsuarioHemograma')!.value,1,2)  // dato.data.fichaC.id_Ficha= para que guarde la misma id_ficha
            }else{
              if (this.flagPerfilBioquimico && valorIngreso<=2){
                console.log('pasoooooooooooooooooooooooooo2');
                this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno == 2)
                console.log('examen2:',this.examenDato);
                 this.grabar(this.examenDato,this.agregaFicha.get('idValidadorPerfilBioquimico')!.value,this.agregaFicha.get('idUsuarioPerfilBioquimico')!.value,1,3)
              }else{
                  if (this.flagPruebasDeCoagulacion && valorIngreso<=3){
                    console.log('pasooooooooooooooooooooooooo3');
                    this.examenDato= this.datoExamen.find(valor=> valor.codigoInterno == 3)
                    console.log('examen3:',this.examenDato);
                    this.grabar(this.examenDato,this.agregaFicha.get('idValidadorPruebasDeCoagulacion')!.value,this.agregaFicha.get('idUsuarioPruebasDeCoagulacion')!.value,1,4)
                  }else{
                      console.log('dato Idddddd:',dato.data)
                      if (this.tipoEmpresa=='Veterinaria'){
                        this.fichaService
                        .envioCorreoSolicitudCliente(dato.data._id)
                        .subscribe((res) => {
                          Swal.fire(
                            'Solicitud se Envió con Éxito',
                            '',
                            'success'
                          );

                        },
                          error => {
                            console.log('error carga:', error);
                            Swal.fire(
                              'ERROR INESPERADO',
                              error,
                            'error'
                            );
                          }
                        );
                      }else{
                        Swal.fire(
                          'Se agregó con Éxito',
                          '',
                          'success'
                        );
                      }
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

    onBlurRutPropietario(event: any){
      const rut = event.target.value;

      if (validateRut(rut) === true){
        this.agregaFicha.get('rutPropietario')!.setValue(formatRut(rut, RutFormat.DOTS_DASH));
         this.cargaPropietarioRut(this.agregaFicha.get('rutPropietario')!.value)
      }
    }

}

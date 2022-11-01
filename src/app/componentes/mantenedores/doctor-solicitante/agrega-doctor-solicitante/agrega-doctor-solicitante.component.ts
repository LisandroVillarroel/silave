  import { Component, OnInit, Inject } from '@angular/core';
  import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { ICliente } from '@app/modelo/cliente-interface';
  import { ICliente_, IDoctorSolicitante } from '@app/modelo/doctorSolicitante-interface';
import { ClienteService } from '@app/servicios/cliente.service';
  import { DoctorSolicitanteService } from '@app/servicios/doctor-solicitante.service';

  import Swal from 'sweetalert2';


@Component({
  selector: 'app-agrega-doctor-solicitante',
  templateUrl: './agrega-doctor-solicitante.component.html',
  styleUrls: ['./agrega-doctor-solicitante.component.css']
})
export class AgregaDoctorSolicitanteComponent implements OnInit {

    form!: UntypedFormGroup;
    usuario: string;
    dato!: IDoctorSolicitante;
    cliente!:ICliente_
    datoCliente!:ICliente[];

    currentUsuario!: JwtResponseI;

    constructor(private dialogRef: MatDialogRef<AgregaDoctorSolicitanteComponent>,
                @Inject(MAT_DIALOG_DATA) data:any,
                private doctorSolicitanteService: DoctorSolicitanteService,
                private clienteService: ClienteService,
                private authenticationService: AuthenticationService
                ) {
                  this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                 this.usuario = data.usuario;
                 this.cargaCliente();
      }

      nombre = new UntypedFormControl('', [Validators.required]);
      idCliente = new UntypedFormControl('', [Validators.required]);

      agregaDoctorSolicitante: UntypedFormGroup = new UntypedFormGroup({
        nombre: this.nombre,
        idCliente: this.idCliente
      });

      getErrorMessage(campo: string) {

        if (campo === 'nombre'){
            return this.nombre.hasError('required') ? 'Debes ingresar Nombre'  : '';
        }

        if (campo === 'idCliente'){
          return this.idCliente.hasError('required') ? 'Debes Seleccionar Cliente' : '';
        }

        return '';
      }


    ngOnInit() {
    }

    cargaCliente(){
      this.clienteService
      .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id)
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

    enviar() {

      this.cliente= {
        idCliente:this.agregaDoctorSolicitante.get('idCliente')!.value._id,
        nombreFantasia: this.agregaDoctorSolicitante.get('idCliente')!.value.nombreFantasia
      }

      this.dato = {
        nombre: this.agregaDoctorSolicitante.get('nombre')!.value,
        cliente:this.cliente,
        usuarioCrea_id: this.usuario,
        usuarioModifica_id: this.usuario,
        empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id
      };
      console.log('agrega 1:', this.dato);
      this.doctorSolicitanteService.postDataDoctorSolicitante(this.dato)
      .subscribe(
        dato => {
          console.log('respuesta agrega:', dato);
          console.log('respuesta:', dato.mensaje);
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
                '',
                'error'
              );
            }
            else{
              console.log('Error Doctor Solicitante:', dato);
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
  }


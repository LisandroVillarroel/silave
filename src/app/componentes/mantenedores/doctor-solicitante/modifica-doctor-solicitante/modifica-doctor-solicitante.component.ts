import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICliente } from '@app/modelo/cliente-interface';
import { ICliente_, IDoctorSolicitante } from '@app/modelo/doctorSolicitante-interface';
import { IEspecie } from '@app/modelo/especie-interface';
import { ClienteService } from '@app/servicios/cliente.service';
import { DoctorSolicitanteService } from '@app/servicios/doctor-solicitante.service';
import { EspecieService } from '@app/servicios/especie.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifica-doctor-solicitante',
  templateUrl: './modifica-doctor-solicitante.component.html',
  styleUrls: ['./modifica-doctor-solicitante.component.css']
})
export class ModificaDoctorSolicitanteComponent implements OnInit {

    form!: UntypedFormGroup;
    dato!: IDoctorSolicitante;
    cliente!:ICliente_
    datoCliente!:ICliente[];

    constructor(private dialogRef: MatDialogRef<ModificaDoctorSolicitanteComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private doctorSolicitanteService: DoctorSolicitanteService,
                private clienteService: ClienteService
                ) {
                  this.cargaCliente()
                  console.log('dato update: ', data);
    }
    nombre = new UntypedFormControl(this.data.nombre, [Validators.required]);
    idCliente = new UntypedFormControl(this.data.cliente.idCliente, [Validators.required]);

    modificaDoctorSolicitante: UntypedFormGroup = new UntypedFormGroup({
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
      .getDataCliente(this.data.empresa_Id)
      .subscribe(res => {
        console.log('cliente:', res['data'])
        this.datoCliente = res['data'] ;
        for(let a=0; a<this.datoCliente.length; a++){
          // for(let b=0; b<this.datoClienteEmpresa[a].empresa!.length; b++){

            //  if (this.datoClienteEmpresa![a].empresa![a].empresa_Id != this.currentUsuario.usuarioDato.empresa.empresa_Id){
              this.datoCliente![a].empresa = this.datoCliente![a].empresa!.filter(x=> x.empresa_Id === this.data.empresa_Id)
            //  }
           // }
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

    enviar() {
      console.log('this.modificaDoctorSolicitante.get(idCliente)!.value',this.modificaDoctorSolicitante.get('idCliente')!.value);
      this.cliente= {
        idCliente:this.modificaDoctorSolicitante.get('idCliente')!.value._id,
        nombreFantasia: this.modificaDoctorSolicitante.get('idCliente')!.value.nombreFantasia
      }

      this.dato = {
        _id: this.data._id,
        nombre: this.modificaDoctorSolicitante.get('nombre')!.value,
        cliente:this.cliente,
        usuarioModifica_id: this.data.usuarioModifica_ido
      };
      console.log('modifica:', this.dato);
      this.doctorSolicitanteService.putDataDoctorSolicitante(this.dato)
      .subscribe(
        dato => {
          console.log('respuesta:', dato['codigo']);
          if (dato['codigo'] === 200) {
              Swal.fire(
              'Ya se grabó con Éxito',
              'Click en Botón!',
              'success'
            ),
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
         // error =>{console.log('error agrega:',<any>error);this.errorMsg=error.error.error;alert('Error: ' + this.errorMsg)}
        );
        // this.dialogRef.close(this.form.value);
      // console.log(this.datoCotiza);
    }

    comparaSelecciona(v1: any, v2: any): boolean {
      return compareFn(v1, v2);
    }

  }

  function compareFn(v1: any, v2: any): boolean {
    return v1 && v2 ? v1.value === v2.value : v1 === v2;
  }

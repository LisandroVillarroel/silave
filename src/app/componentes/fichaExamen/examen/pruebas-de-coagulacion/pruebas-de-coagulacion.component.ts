  import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { MatAccordion } from '@angular/material/expansion';
  import { JwtResponseI } from '@app/autentica/_models';
  import { AuthenticationService } from '@app/autentica/_services';
import { ICliente } from '@app/modelo/cliente-interface';
  import { IPerfilBioquimico, IResultado } from '@app/modelo/examenPerfilBioquimico-interface';
import { IPruebasDeCoagulacion } from '@app/modelo/examenPruebasDeCoagulacion';
  import { IFicha } from '@app/modelo/ficha-interface';
import { ClienteService } from '@app/servicios/cliente.service';
  import { ExamenService } from '@app/servicios/examen.service';
  import { FichaService } from '@app/servicios/ficha.service';
  import Swal from 'sweetalert2';

  @Component({
    selector: 'app-pruebas-de-coagulacion',
    templateUrl: './pruebas-de-coagulacion.component.html',
    styleUrls: ['./pruebas-de-coagulacion.component.css']
  })
  export class PruebasDeCoagulacionComponent implements OnInit {

    @ViewChild('htmlData') htmlData!:ElementRef;
    @ViewChild(MatAccordion) accordion!: MatAccordion;

      currentUsuario!: JwtResponseI;

      form!: FormGroup;
      usuario!: string;
      datoFicha!: IFicha;
      datoFichaRespuesta!: IFicha;
      /*datoExamen!: IExamen[];*/

      IPruebasDeCoagulacion!: IPruebasDeCoagulacion;
      IResultado!: IResultado[];

      datoClienteEmpresa!: ICliente;
      emailRecepcionExamenCliente='';

      tiempoProtrombinaFlag = false;
      tiempoTromboplastinaParcialFlag = false;


      imprime=false;

      nombreExamen='';

      constructor(private dialogRef: MatDialogRef<PruebasDeCoagulacionComponent>,
                  @Inject(MAT_DIALOG_DATA) public data:any,
                  private clienteService: ClienteService,
                  private fichaService: FichaService,
                  private authenticationService: AuthenticationService
                  ) {
                    this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
                   console.log('ficha:',data);
                   this.datoFicha=data;
        }

        tiempoProtrombina = new FormControl('',  [Validators.required] );
        tiempoTromboplastinaParcial = new FormControl('',  [Validators.required] );
        Observaciones = new FormControl('');

        ingresaPruabasDeCoagulacion: FormGroup = new FormGroup({
          tiempoProtrombina: this.tiempoProtrombina,
          tiempoTromboplastinaParcial: this.tiempoTromboplastinaParcial,
          Observaciones: this.Observaciones
        });

        getErrorMessage(campo: string) {

          if (campo === 'tiempoProtrombina'){
            return this.tiempoProtrombina.hasError('required') ? 'Debes Ingresar Tiempo Protrombina' : '';
          }

          if (campo === 'tiempoTromboplastinaParcial'){
            return this.tiempoTromboplastinaParcial.hasError('required') ? 'Debes Ingresar Tiempo Tromboplastina Parcial' : '';
          }


          if (campo === 'srObservaciones'){
            return this.Observaciones.hasError('required') ? 'Debes Ingresar Observaciones' : '';
          }

          return '';
        }


      ngOnInit() {
        //this.getExamen();
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

      tiempoProtrombinaFormula(){

      if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
          if (this.ingresaPruabasDeCoagulacion.get('tiempoProtrombina')!.value<9 || this.ingresaPruabasDeCoagulacion.get('tiempoProtrombina')!.value>14){this.tiempoProtrombinaFlag=true}
          else{this.tiempoProtrombinaFlag=false}
      }
      else{
          if (this.ingresaPruabasDeCoagulacion.get('tiempoProtrombina')!.value<9 || this.ingresaPruabasDeCoagulacion.get('tiempoProtrombina')!.value>14){this.tiempoProtrombinaFlag=true}
          else{this.tiempoProtrombinaFlag=false}
      }

    //  this.sumaTotal();
    }

    tiempoTromboplastinaParcialFormula(){

      if (this.data.fichaC.especie.nombre.toUpperCase()=="CANINO"){
          if (this.ingresaPruabasDeCoagulacion.get('tiempoTromboplastinaParcial')!.value<14 || this.ingresaPruabasDeCoagulacion.get('tiempoTromboplastinaParcial')!.value>22){this.tiempoTromboplastinaParcialFlag=true}
          else{this.tiempoTromboplastinaParcialFlag=false}
      }
      else{
          if (this.ingresaPruabasDeCoagulacion.get('tiempoTromboplastinaParcial')!.value<14 || this.ingresaPruabasDeCoagulacion.get('tiempoTromboplastinaParcial')!.value>22){this.tiempoTromboplastinaParcialFlag=true}
          else{this.tiempoTromboplastinaParcialFlag=false}
      }
    //  this.sumaTotal();
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
              parametro: 'Tiempo Protrombina',
              resultado: this.ingresaPruabasDeCoagulacion.get('tiempoProtrombina')!.value,
              unidad: 'SEG',
              caninos: '9 - 14',
              felinos: '9 - 14',
              flag: this.tiempoProtrombinaFlag
            },
            {
              parametro: 'Tiempo Tromboplastina Parcial',
              resultado: this.ingresaPruabasDeCoagulacion.get('tiempoTromboplastinaParcial')!.value,
              unidad: 'SEG',
              caninos: '14 - 22',
              felinos: '14 - 22',
              flag: this.tiempoTromboplastinaParcialFlag
            },
          ]


        this.IPruebasDeCoagulacion= {
            resultado: this.IResultado,
            observaciones: this.ingresaPruabasDeCoagulacion.get('Observaciones')!.value,


        }

       this.datoFicha = {
         _id:this.data._id,
        fichaC: this.data.fichaC,
        empresa: this.data.empresa,
        formatoResultado:{
      //    examen: this.data.fichaC.examen,
          pruebasDeCoagulacion: this.IPruebasDeCoagulacion,
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


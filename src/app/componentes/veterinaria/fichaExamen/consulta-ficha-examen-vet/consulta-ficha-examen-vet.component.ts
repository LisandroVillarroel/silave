  import {Component, OnInit, ViewChild} from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {MatTableDataSource} from '@angular/material/table';
  import {MatSort} from '@angular/material/sort';
  import {MatPaginator} from '@angular/material/paginator';
  import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

  import Swal from 'sweetalert2';
  import { JwtResponseI } from '@app/autentica/_models';
  import { IFicha } from '@app/modelo/ficha-interface';
  import { FichaService } from '@app/servicios/ficha.service';
  import { AuthenticationService } from '@app/autentica/_services';

  import {saveAs} from 'file-saver';
  import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

  import * as moment from 'moment';

  const today = new Date();

  const dia = today.getDate();
  const mes = today.getMonth();
  const ano = today.getFullYear();


  @Component({
    selector: 'app-consulta-ficha-examen-vet',
    templateUrl: './consulta-ficha-examen-vet.component.html',
    styleUrls: ['./consulta-ficha-examen-vet.component.css']
  })
  export class ConsultaFichaExamenVetComponent implements OnInit {




      datoFichaPar!: IFicha[];
      currentUsuario!: JwtResponseI;
      datoFicha!: IFicha;

      // tslint:disable-next-line:max-line-length
      displayedColumns: string[] = ['index', 'fichaC.numeroFicha','fichaC.cliente.nombreFantasia', 'fichaC.nombrePaciente', 'fichaC.examen.nombre',  'fechaHora_crea', 'fechaHora_envia_modifica', 'estadoFicha', 'opciones'];
      dataSource: MatTableDataSource<IFicha>;

      @ViewChild(MatPaginator ) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;


    constructor(private fichaService: FichaService,
                public httpClient: HttpClient,
                public dialog: MatDialog,
                private authenticationService: AuthenticationService
        ) {
          this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
          this.dataSource = new MatTableDataSource<IFicha>();

          this.dataSource.filterPredicate = (data: any, filter) => {
            const dataStr =JSON.stringify(data).toLowerCase();
            return dataStr.indexOf(filter) != -1;
          }

      }

      start = new UntypedFormControl(new Date(ano, mes, dia), [Validators.required]);
      end = new UntypedFormControl(new Date(ano, mes, dia), [Validators.required]);



      range  = new UntypedFormGroup({
        start: this.start,
        end: this.end,
      });


    async ngOnInit() {
        console.log('pasa ficha 1');
        if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
        }


        let fechaInicio=ano+'/'+(mes+1)+'/'+dia;
        let fechaFin=ano+'/'+(mes+1)+'/'+dia;

        console.log('fecha Inicio:', fechaInicio)
        console.log('fecha hoy:', today.getDate())

        fechaInicio=moment(fechaInicio).format('YYYY-MM-DDT00:00:00.000') + 'Z';
        fechaFin=moment(fechaFin).format('YYYY-MM-DDT23:59:59.000') + 'Z'
        await this.getListFicha(fechaInicio,fechaFin);

        this.dataSource.sortingDataAccessor = (item:any, property:any) => {
          switch(property) {
            case 'fichaC.numeroFicha': return item.fichaC.numeroFicha;
            case 'fichaC.cliente.nombreFantasia':return item.fichaC.cliente.nombreFantasia;
            case 'fichaC.nombrePaciente': return item.fichaC.nombrePaciente;
            case 'fichaC.examen.nombre': return item.fichaC.examen.nombre;
            default: return item[property];
          }
        };
      }

    async getListFicha(fechaInicio:string,fechaFin:string) {
        console.log('pasa ficha 2');
        this.fichaService
          .getDataFichaPorFechaVet(this.currentUsuario.usuarioDato.cliente?.idCliente!,'Enviado',this.currentUsuario.usuarioDato._id,fechaInicio,fechaFin)
          .subscribe(res => {
            console.log('fichaaaaaa: ', res['data']);
            this.datoFichaPar=res['data'];
            this.datoFichaPar.forEach(function (item:any){
                if(item.estadoFicha==='Enviado'){
                  item.estadoFicha="Recibido";
                }
            });
            this.dataSource.data = this.datoFichaPar;
          },
          // console.log('yo:', res as PerfilI[]),
          error => {
            console.log('error carga:', error);
            Swal.fire(
              'ERROR INESPERADO',
              error.error.error,
             'error'
           );
          }
        ); // (this.dataSource.data = res as PerfilI[])
      }

      // tslint:disable-next-line: use-lifecycle-interface
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }


    descargaExamen(nombre:string,nombreExamen:string,rutEmpresa:string) {

      let directorioNombre=rutEmpresa.slice(0,-2)+'/'+nombre+'.pdf';
      let nombreP=nombre+'.pdf';
      console.log('rura:',directorioNombre);

      this.fichaService
      .postDownLoadFile(directorioNombre)
      .subscribe(res => {

        saveAs(res, nombreExamen+'-'+nombreP)
      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error.error.error,
         'error'
       );
      }
     ); // (this.dataSource.data = res as PerfilI[])
    }

    consultaFicha(nombre:string,rutEmpresa:string) {

      let directorioNombre=rutEmpresa.slice(0,-2)+'/'+nombre+'.pdf';
      let nombreP=nombre+'.pdf';
      console.log('rura:',directorioNombre);

      this.fichaService
      .postDownLoadFile(directorioNombre)
      .subscribe(res => {
        console.log(' muestra res',res);
        //saveAs(res, nombreExamen+'-'+nombreP)
        const file = new Blob([res,'prueba'], { type: 'application/pdf' });
        console.log(' muestra file',file);
        const fileURL = URL.createObjectURL(file);
        console.log('respuesta muestra',fileURL);
        window.open(fileURL,"prueba");
      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error.error.error,
         'error'
       );
      }
     ); // (this.dataSource.data = res as PerfilI[])
    }

    async envioEmail(ficha:IFicha){

      Swal.fire({
        title: "Envía Exámen al Cliente!",
        text: "Ingrese Email",
        input: 'email',
        inputValue:ficha.fichaC.correoClienteFinal,
        showCancelButton: true ,
        cancelButtonText: 'Cancelar' ,
        confirmButtonColor: 'green',
        confirmButtonText: 'Enviar',
        validationMessage: 'Email Erróneo Ingresado'
        }).then((result) => {

        if (result.value) {

             this.modificaCorreoClienteFinal(ficha,result.value);

          //  Swal.fire('Resultado:'+result.value);
        }});

      /*
      this.fichaService
      .envioCorreo(id)
      .subscribe((res) => {
        Swal.fire(
          'Exámen se envió con Éxito',
          '',
          'success'
        );
      },
      // console.log('yo:', res as PerfilI[]),
      error => {
        console.log('error carga:', error);
        Swal.fire(
          'ERROR INESPERADO',
          error.error.error,
         'error'
       );
      }
    ); // (this.dataSource.data = res as PerfilI[])
    */
      }

      // Actualiza Email ficha Cliente final
      modificaCorreoClienteFinal(fichaP:IFicha,correoClienteFinalP:string){
        fichaP.fichaC.correoClienteFinal=correoClienteFinalP
        this.datoFicha = {
          _id:fichaP._id,
          fichaC:fichaP.fichaC

        }


        this.fichaService.putDataFicha(this.datoFicha)
        .subscribe(
          dato => {
            if (dato.codigo == 200) {
              this.envioCorreoClienteFinal(this.datoFicha._id!);
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



      envioCorreoClienteFinal(id: string){
        this.fichaService
        .envioCorreoClienteFinal(id)
        .subscribe((res) => {
          Swal.fire(
            'Exámen se envió con Éxito',
            '',
            'success'
          );
        },
        // console.log('yo:', res as PerfilI[]),
        error => {
          console.log('error carga:', error);
          Swal.fire(
            'ERROR INESPERADO',
            error.error.error,
           'error'
         );
        }
      ); // (this.dataSource.data = res as PerfilI[])
        }

    async buscar(){
      console.log('dats fecha:',this.range.get('start')!.value)
      console.log('fin fecha:',this.range.get('end')!.value)

      const fechaInicio=moment(this.range.get('start')!.value).format('YYYY-MM-DDT00:00:00.000') + 'Z';
      const fechaFin=moment(this.range.value.end).format('YYYY-MM-DDT23:59:59.000') + 'Z'

      console.log('fecha Inicio:',fechaInicio);
      console.log('fecha fin:',fechaFin);
      this.getListFicha(fechaInicio,fechaFin);
    }
  }


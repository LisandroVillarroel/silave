import { catchError } from 'rxjs/operators';
  import {Component, OnInit, ViewChild} from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {MatTableDataSource} from '@angular/material/table';
  import {MatSort} from '@angular/material/sort';
  import {MatPaginator} from '@angular/material/paginator';
  import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

  import Swal from 'sweetalert2';

  import { AuthenticationService } from './../../../autentica/_services';
  import { JwtResponseI } from './../../../autentica/_models';
  import { IFicha } from './../../../modelo/ficha-interface';
  import { FichaService } from './../../../servicios/ficha.service';
import { HemogramaComponent } from './hemograma/hemograma.component';
import { PerfilBioquimicoComponent } from './perfil-bioquimico/perfil-bioquimico.component';
import { PruebasDeCoagulacionComponent } from './pruebas-de-coagulacion/pruebas-de-coagulacion.component';
;

@Component({
  selector: 'app-examen-ficha',
  templateUrl: './examen-ficha.component.html',
  styleUrls: ['./examen-ficha.component.css']
})
export class ExamenFichaComponent implements OnInit {


    //  datoFichaPar: IFicha;
      currentUsuario!: JwtResponseI;
     // id: string;

      // tslint:disable-next-line:max-line-length
      displayedColumns: string[] = ['index', 'fichaC.numeroFicha','fichaC.cliente.nombreFantasia', 'fichaC.nombrePaciente', 'fichaC.examen.nombre',  'fechaHora_crea', 'estadoFicha', 'opciones'];
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

      }


    ngOnInit() {
        console.log('pasa ficha 1');
        if (this.authenticationService.getCurrentUser() != null) {
          this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
        }
        this.getListFicha();
      }

    getListFicha(): void {
        console.log('pasa ficha 2');
        this.fichaService
          .getDataFicha(this.currentUsuario.usuarioDato.empresa.empresa_Id,'Ingresado',this.currentUsuario.usuarioDato._id,'administrador')
          .subscribe(res => {
            console.log('fichaaaaaa: ', res['data']);
            this.dataSource.data = res['data'] as any[];
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

    actualizaFicha(datoFicha: any) {

      console.log('examenficghaaaa:',datoFicha);
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '80%';
        dialogConfig.height = '90%';
        dialogConfig.position = { top : '5%'};

        dialogConfig.data = datoFicha;
        if (datoFicha.fichaC.examen.codigoInterno==1){
          this.dialog.open(HemogramaComponent, dialogConfig)
          .afterClosed().subscribe(
          data => {console.log('Dialog output3333:', data);
                    if (data === 1) {
                      console.log('paso dato')
                        this.refreshTable();
                    }
            }
          );
        }else{
          if (datoFicha.fichaC.examen.codigoInterno==2){
            this.dialog.open(PerfilBioquimicoComponent, dialogConfig)
            .afterClosed().subscribe(
            data => {console.log('Dialog output3333:', data);
                      if (data === 1) {
                        console.log('paso dato')
                          this.refreshTable();
                      }
              }
            );
          }else{
            if (datoFicha.fichaC.examen.codigoInterno==3){
              this.dialog.open(PruebasDeCoagulacionComponent, dialogConfig)
              .afterClosed().subscribe(
              data => {console.log('Dialog output3333:', data);
                        if (data === 1) {
                          console.log('paso dato')
                            this.refreshTable();
                        }
                }
              );
            }
          }
        }

      }

        private refreshTable() {
        // Refreshing table using paginator
        // Thanks yeager-j for tips
        // https://github.com/marinantonio/angular-mat-table-crud/issues/12
       // this.dataSource.paginator._changePageSize(this.paginator.pageSize);
       // this.noticia=this.servicio.getNoticias();

       this.getListFicha();
       this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
      }
    }


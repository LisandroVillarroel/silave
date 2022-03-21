import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import { JwtResponseI } from '../../../../autentica/_models';
import { AuthenticationService } from '../../../../autentica/_services';

import { AgregaFormato1Component } from '../../../ingresosExamenFicha/agrega-examen-ficha/examenes/agrega-formato1/agrega-formato1.component';
import { ModificaFormato1Component } from './modifica-formato1/modifica-formato1.component';
import { ConsultaFormato1Component } from './consulta-formato1/consulta-formato1.component';
import { EliminaFormato1Component } from './elimina-formato1/elimina-formato1.component';
import Swal from 'sweetalert2';
import { IFormato1 } from './../../../../modelo/formato1-interface';
import { Formato1Service } from './../../../../servicios/formato1.service';

@Component({
  selector: 'app-formato1',
  templateUrl: './formato1.component.html',
  styleUrls: ['./formato1.component.css']
})
export class Formato1Component implements OnInit {

  datoPar!: IFormato1;
  currentUsuario!: JwtResponseI;
 // id: string;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'nombreFormato', 'estado','opciones'];
  dataSource: MatTableDataSource<IFormato1>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private servicioService: Formato1Service,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IFormato1>();

  }

ngOnInit() {
    console.log('pasa formato 1');
    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    this.getList();
  }

getList(): void {
    this.servicioService
      .getDataFormato1()
      .subscribe(res => {
        console.log('pasa formato 2', res);
        this.dataSource.data = res['data'] as IFormato1[];
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

agregaNuevo() {
  //  agregaNuevo(empresaInterface_: EmpresaI) {
    // Nuevo
    console.log('usu:', this.currentUsuario.usuarioDato._id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '95%';
    dialogConfig.position = { top : '1%'};
    dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id};
  //  dialogConfig.data = {
  //    idProducto: idProdP,
  //    titulo: tituloP
  //  };


    this.dialog.open(AgregaFormato1Component, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

actualiza(id: string, nombreFormato: string, estado: string) {
    this.datoPar = {
      _id: id,
      nombreFormato,
      estado,
     // usuarioCrea_id: this.currentUsuario.usuarioDato.id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoPar;
    this.dialog.open(ModificaFormato1Component, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

consulta(id: string, nombreFormato: string, estado: string) {
    this.datoPar = {
      _id: id,
      nombreFormato,
      estado,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoPar;
    this.dialog.open(ConsultaFormato1Component, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
 }

elimina(id: string,  nombreFormato: string, estado: string) {
    this.datoPar = {
      _id: id,
      nombreFormato,
      estado,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoPar;
    this.dialog.open(EliminaFormato1Component, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

    private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
   // this.dataSource.paginator._changePageSize(this.paginator.pageSize);
   // this.noticia=this.servicio.getNoticias();

   this.getList();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}

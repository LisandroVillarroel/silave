
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IValidador } from '@app/modelo/validador-interface';
import { ValidadorService } from '@app/servicios/validador.service';

import Swal from 'sweetalert2';
import { AgregaValidadoresComponent } from './agrega-validadores/agrega-validadores.component';
import { ConsultaValidadoresComponent } from './consulta-validadores/consulta-validadores.component';
import { EliminaValidadoresComponent } from './elimina-validadores/elimina-validadores.component';
import { ModificaValidadoresComponent } from './modifica-validadores/modifica-validadores.component';



@Component({
  selector: 'app-validadores',
  templateUrl: './validadores.component.html',
  styleUrls: ['./validadores.component.css']
})
export class ValidadoresComponent implements OnInit {


  datoValidadorPar!: IValidador;
  currentUsuario!: JwtResponseI;

  show:boolean=true;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'rutValidador','nombres','apellidoPaterno','apellidoMaterno','profesion','telefono','opciones'];
  dataSource: MatTableDataSource<IValidador>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private validadorService: ValidadorService,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IValidador>();

      // Permite fintrar en nodos o sub campos
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }


  }



 ngOnInit() {

    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }

   this.getListValidador();
  }

  getListValidador()  {
    this.validadorService
      .getDataValidadorTodo(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('validador:', res['data'])
        this.dataSource.data = res['data'] as IValidador[];
      },

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


agregaNuevo() {
    // Nuevo
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};
    dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id};
  //  dialogConfig.data = {
  //    idProducto: idProdP,
  //    titulo: tituloP
  //  };


    this.dialog.open(AgregaValidadoresComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
  }

actualizaValidador(datoValidador:IValidador): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};

    dialogConfig.data = datoValidador;
    this.dialog.open(ModificaValidadoresComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );

  }

consultaValidador(datoValidador:IValidador) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};

    dialogConfig.data = datoValidador;
    this.dialog.open(ConsultaValidadoresComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
 }

eliminaValidador(datoValidador:IValidador) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};

    dialogConfig.data = datoValidador;
    this.dialog.open(EliminaValidadoresComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );

  }

    async refreshTable() {

   const respuesta = await this.getListValidador();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}
function AgregaDatosValidadorComponent(AgregaDatosValidadorComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

function EliminaValidadorComponent(EliminaValidadorComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}


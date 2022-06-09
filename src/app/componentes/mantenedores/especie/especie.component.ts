import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';


import { JwtResponseI } from '../../../autentica/_models';
import { AuthenticationService } from '../../../autentica/_services';

import Swal from 'sweetalert2';
import { EspecieService } from './../../../servicios/especie.service';
import { IEspecie } from './../../../modelo/especie-interface';
import { AgregaEspecieComponent } from './agrega-especie/agrega-especie.component';
import { ModificaEspecieComponent } from './modifica-especie/modifica-especie.component';
import { ConsultaEspecieComponent } from './consulta-especie/consulta-especie.component';
import { EliminaEspecieComponent } from './elimina-especie/elimina-especie.component';



@Component({
  selector: 'app-especie',
  templateUrl: './especie.component.html',
  styleUrls: ['./especie.component.css']
})
export class EspecieComponent implements OnInit {



  datoEspeciePar!: IEspecie;
  currentUsuario!: JwtResponseI;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'nombre', 'opciones'];
  dataSource: MatTableDataSource<IEspecie>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private especieService: EspecieService,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IEspecie>();

  }


ngOnInit() {
    console.log('pasa emp 1');
    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    this.getListEspecie();
  }

getListEspecie(): void {
    console.log('pasa emp 2');
    this.especieService
      .getDataEspecieTodo(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('especie: ', res['data']);
        this.dataSource.data = res['data'] as IEspecie[];
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
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};
    dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id};
  //  dialogConfig.data = {
  //    idProducto: idProdP,
  //    titulo: tituloP
  //  };


    this.dialog.open(AgregaEspecieComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

actualizaEspecie(id: string, nombre: string): void {
    this.datoEspeciePar = {
      _id: id,
      nombre,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};
    // dialogConfig.data =
    // {id, rutEmpresa, razonSocial, nombreFantasia, direccion, usuarioCrea_id: this.currentUsuario.usuarioDato.usuario};
    dialogConfig.data = this.datoEspeciePar;
    this.dialog.open(ModificaEspecieComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );

  }

consultaEspecie(id: string, nombre: string) {
    this.datoEspeciePar = {
      _id: id,
      nombre,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoEspeciePar;
    this.dialog.open(ConsultaEspecieComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
 }

eliminaEspecie(id: string, nombre: string) {
    this.datoEspeciePar = {
      _id: id,
      nombre,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoEspeciePar;
    this.dialog.open(EliminaEspecieComponent, dialogConfig)
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

   this.getListEspecie();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}

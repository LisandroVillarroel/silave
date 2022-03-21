import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import { JwtResponseI } from '../../../autentica/_models';
import { AuthenticationService } from '../../../autentica/_services';

import { AgregaExamenComponent } from './agrega-examen/agrega-examen.component';
import { ModificaExamenComponent } from './modifica-examen/modifica-examen.component';
import { ConsultaExamenComponent } from './consulta-examen/consulta-examen.component';
import { EliminaExamenComponent } from './elimina-examen/elimina-examen.component';
import Swal from 'sweetalert2';
import { IExamen } from './../../../modelo/examen-interface';
import { ExamenService } from './../../../servicios/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  datoPar!: IExamen;
  currentUsuario!: JwtResponseI;
 // id: string;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'codigoExamen', 'nombre', 'sigla', 'precio','opciones'];
  dataSource: MatTableDataSource<IExamen>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private servicioService: ExamenService,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IExamen>();

  }

ngOnInit() {
    console.log('pasa emp 1');
    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    this.getList();
  }

getList(): void {
    console.log('pasa exámen 1');
    this.servicioService
      .getDataExamen(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('pasa exámen 2', res);
        this.dataSource.data = res['data'] as IExamen[];
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
    console.log('usu:', this.currentUsuario.usuarioDato);
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


    this.dialog.open(AgregaExamenComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

actualiza(id: string, codigoExamen: string, nombre: string, sigla: string, precio: number) {
    this.datoPar = {
      _id: id,
      codigoExamen,
      nombre,
      sigla,
      precio,
      empresa_Id: this.currentUsuario.usuarioDato.empresa.empresa_Id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };
    console.log('actualiza',this.datoPar);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};
    // dialogConfig.data =
    // {id, rutEmpresa, razonSocial, nombreFantasia, direccion, usuarioCrea_id: this.currentUsuario.usuarioDato.usuario};
    dialogConfig.data = this.datoPar;
    this.dialog.open(ModificaExamenComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

consulta(id: string, codigoExamen: string, nombre: string, sigla: string, precio: number) {
    this.datoPar = {
      _id: id,
      codigoExamen,
      nombre,
      sigla,
      precio,
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
    this.dialog.open(ConsultaExamenComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
 }

elimina(id: string,  codigoExamen: string, nombre: string, sigla: string, precio: number) {
    this.datoPar = {
      _id: id,
      codigoExamen,
      nombre,
      sigla,
      precio,
     // usuarioCrea_id: this.currentUsuario.usuarioDato.id
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoPar;
    this.dialog.open(EliminaExamenComponent, dialogConfig)
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

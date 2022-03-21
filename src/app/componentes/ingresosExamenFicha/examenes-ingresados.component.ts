
import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { AuthenticationService } from './../../autentica/_services';
import { JwtResponseI } from './../../autentica/_models';
import { AgregaExamenesFichasComponent } from './agrega-examen-ficha/agrega-examenes-fichas.component';
import { IFicha } from './../../modelo/ficha-interface';
import { FichaService } from './../../servicios/ficha.service';

@Component({
  selector: 'app-examenes-ingresados',
  templateUrl: './examenes-ingresados.component.html',
  styleUrls: ['./examenes-ingresados.component.css']
})
export class ExamenesIngresadosComponent implements OnInit {

  datoFichaPar!: IFicha;
  currentUsuario!: JwtResponseI;
 // id: string;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'numeroFicha','cliente:{nombreFantasia}', 'nombrePaciente', 'examen:{nombre}', 'opciones'];
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
      .getDataFicha(this.currentUsuario.usuarioDato.empresa.empresa_Id,'Ingresado',this.currentUsuario.usuarioDato._id,'Administrador')
      .subscribe(res => {
        console.log('ficha: ', res);
        this.dataSource.data = res['data'] as any[];
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
    dialogConfig.width = '80%';
    dialogConfig.height = '85%';
    dialogConfig.position = { top : '2%'};
    dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id, empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id};
  //  dialogConfig.data = {
  //    idProducto: idProdP,
  //    titulo: tituloP
  //  };


    this.dialog.open(AgregaExamenesFichasComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }
/*
actualizaCliente(id: string, rutCliente: string, razonSocial: string, nombreFantasia: string, direccion: string,
                 telefono: string, email: string, nombreContacto: string) {
    this.datoClientePar = {
      _id: id,
      rutCliente,
      razonSocial,
      nombreFantasia,
      direccion,
      telefono,
      email,
      nombreContacto,
     // usuarioCrea_id: this.currentUsuario.usuarioDato.id,
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
    dialogConfig.data = this.datoClientePar;
    this.dialog.open(ModificaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );

  }

consultaCliente(id: string, rutCliente: string, razonSocial: string, nombreFantasia: string, direccion: string,
                telefono: string, email: string, nombreContacto: string) {
    this.datoClientePar = {
      _id: id,
      rutCliente,
      razonSocial,
      nombreFantasia,
      direccion,
      telefono,
      email,
      nombreContacto,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoClientePar;
    this.dialog.open(ConsultaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
 }

eliminaCliente(id: string, rutCliente: string, razonSocial: string, nombreFantasia: string, direccion: string,
               telefono: string, email: string, nombreContacto: string) {
    this.datoClientePar = {
      _id: id,
      rutCliente,
      razonSocial,
      nombreFantasia,
      direccion,
      telefono,
      email,
      nombreContacto,
     // usuarioCrea_id: this.currentUsuario.usuarioDato.id
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoClientePar;
    this.dialog.open(EliminaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );

  }
*/
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

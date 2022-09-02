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
import { DoctorSolicitanteService } from './../../../servicios/doctor-solicitante.service';
import { IDoctorSolicitante } from './../../..//modelo/doctorSolicitante-interface';
import { AgregaDoctorSolicitanteComponent } from './agrega-doctor-solicitante/agrega-doctor-solicitante.component';
import { ModificaDoctorSolicitanteComponent } from './modifica-doctor-solicitante/modifica-doctor-solicitante.component';
import { ConsultaDoctorSolicitanteComponent } from './consulta-doctor-solicitante/consulta-doctor-solicitante.component';
import { EliminaDoctorSolicitanteComponent } from './elimina-doctor-solicitante/elimina-doctor-solicitante.component';


@Component({
  selector: 'app-doctor-solicitante',
  templateUrl: './doctor-solicitante.component.html',
  styleUrls: ['./doctor-solicitante.component.css']
})
export class DoctorSolicitanteComponent implements OnInit {



  datoDoctorSolicitantePar!: IDoctorSolicitante;
  currentUsuario!: JwtResponseI;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'nombre','cliente:{nombreFantasia}','opciones'];
  dataSource: MatTableDataSource<IDoctorSolicitante>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private doctorSolicitanteService: DoctorSolicitanteService,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IDoctorSolicitante>();

      // Permite fintrar en nodos o sub campos
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr =JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      }


  }



async ngOnInit() {
    console.log('pasa emp 1');



    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    await this.getListDoctorSolicitante();

    // Permite ordenar cuando es estructura anidada
    this.dataSource.sortingDataAccessor = (item:any, property:any) => {
      switch(property) {
        case 'cliente:{nombreFantasia}': return item.cliente.nombreFantasia;
        default: return item[property];
      }
    };
/*
const sortingDataAccessor = (item: any, property: any) => {
  switch (property) {
    case 'cliente:{nombreFantasia}': return item.cliente.nombreFantasia;
    default: return item[property];
  }
};

    this.dataSource.sortingDataAccessor = sortingDataAccessor
*/


    this.dataSource.sort = this.sort;
  }

  getListDoctorSolicitante()  {
    console.log('pasa solicitante 2:',this.currentUsuario.usuarioDato.empresa.empresa_Id);
    this.doctorSolicitanteService
      .getDataDoctorSolicitante(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe(res => {
        console.log('Doctor: ', res['data']);

        this.dataSource.data = res['data'] as IDoctorSolicitante[];
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


    this.dialog.open(AgregaDoctorSolicitanteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
  }

actualizaDoctorSolicitante(id: string, nombre: string, idCliente:string, nombreFantasia:string): void {
    this.datoDoctorSolicitantePar = {
      _id: id,
      cliente:{
        idCliente: idCliente,
        nombreFantasia: nombreFantasia,
      },
      nombre,
      usuarioCrea_id: this.currentUsuario.usuarioDato._id,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id,
      empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};
    // dialogConfig.data =
    // {id, rutEmpresa, razonSocial, nombreFantasia, direccion, usuarioCrea_id: this.currentUsuario.usuarioDato.usuario};
    dialogConfig.data = this.datoDoctorSolicitantePar;
    this.dialog.open(ModificaDoctorSolicitanteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );

  }

consultaDoctorSolicitante(id: string, nombre: string, idCliente:string, nombreFantasia:string) {
    this.datoDoctorSolicitantePar = {
      _id: id,
      cliente:{
        idCliente: idCliente,
        nombreFantasia: nombreFantasia,
      },
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

    dialogConfig.data = this.datoDoctorSolicitantePar;
    this.dialog.open(ConsultaDoctorSolicitanteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data === 1)  {
                  this.refreshTable();
              }
      }
    );
 }

eliminaDoctorSolicitante(id: string, nombre: string,idCliente:string, nombreFantasia:string) {
    this.datoDoctorSolicitantePar = {
      _id: id,
      cliente:{
        idCliente: idCliente,
        nombreFantasia: nombreFantasia,
      },
      nombre,
      usuarioModifica_id: this.currentUsuario.usuarioDato._id
    };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = this.datoDoctorSolicitantePar;
    this.dialog.open(EliminaDoctorSolicitanteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );

  }

    async refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
   // this.dataSource.paginator._changePageSize(this.paginator.pageSize);
   // this.noticia=this.servicio.getNoticias();

   const respuesta = await this.getListDoctorSolicitante();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}

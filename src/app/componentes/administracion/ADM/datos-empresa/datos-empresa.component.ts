import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import { EspecieService } from '@app/servicios/especie.service';
import Swal from 'sweetalert2';
import { AgregaDatosEmpresaComponent } from './agrega-datos-empresa/agrega-datos-empresa.component';
import { ConsultaDatosEmpresaComponent } from './consulta-datos-empresa/consulta-datos-empresa.component';
import { EliminaDatosEmpresaComponent } from './elimina-datos-empresa/elimina-datos-empresa.component';
import { ModificaDatosEmpresaComponent } from './modifica-datos-empresa/modifica-datos-empresa.component';


@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent implements OnInit {


  datoEmpresaPar!: IEmpresa;
  currentUsuario!: JwtResponseI;

  show:boolean=true;
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'rutEmpresa','razonSocial','nombreFantasia','nombreContacto','telefono','emailEnvio','opciones'];
  dataSource: MatTableDataSource<IEmpresa>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private empresaService: EmpresaService,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IEmpresa>();

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

   this.getListEmpresa();
  }

  getListEmpresa()  {
    this.empresaService
      .getDataEmpresaTodo()
      .subscribe(res => {
        console.log('empresa:', res['data'])
        this.dataSource.data = res['data'] as IEmpresa[];
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
/*
getListEmpresa(){
    this.especieService
    .getDataEmpresaTodo()
    .subscribe(res => {
      console.log('empresa:', res['data'])
      this.dataSource.data = res['data'] as IEmpresa[];
    //  this.datoEspecie = res['data'] ;
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


    this.dialog.open(AgregaDatosEmpresaComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
  }

actualizaEmpresa(datoEmpresa:IEmpresa): void {

    console.log('datos empresa total:',datoEmpresa);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};
    // dialogConfig.data =
    // {id, rutEmpresa, razonSocial, nombreFantasia, direccion, usuarioCrea_id: this.currentUsuario.usuarioDato.usuario};
    dialogConfig.data = datoEmpresa;
    this.dialog.open(ModificaDatosEmpresaComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );

  }

consultaEmpresa(datoEmpresa:IEmpresa) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};

    dialogConfig.data = datoEmpresa;
    this.dialog.open(ConsultaDatosEmpresaComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );
 }

eliminaEmpresa(datoEmpresa:IEmpresa) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.position = { top : '3%'};

    dialogConfig.data = datoEmpresa;
    this.dialog.open(EliminaDatosEmpresaComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {
              if (data !== undefined) {
                  this.refreshTable();
              }
      }
    );

  }

    async refreshTable() {

   const respuesta = await this.getListEmpresa();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}

import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import {IPropietario} from '../../../modelo/propietario-interface';
import {PropietarioService } from '../../../servicios/propietario.service';

import { JwtResponseI } from '../../../autentica/_models';
import { AuthenticationService } from '../../../autentica/_services';

import { AgregaPropietarioComponent } from './agrega-propietario/agrega-propietario.component';
import { ModificaPropietarioComponent } from './modifica-propietario/modifica-propietario.component';
import { ConsultaPropietarioComponent } from './consulta-propietario/consulta-propietario.component';
import { EliminaPropietarioComponent } from './elimina-propietario/elimina-propietario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  datoPar!: IPropietario;
  currentUsuario!: JwtResponseI;
 // id: string;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'rutPropietario', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'direccion', 'telefono', 'email', 'opciones'];
  dataSource: MatTableDataSource<IPropietario>;

  @ViewChild(MatPaginator ) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private servicioService: PropietarioService,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<IPropietario>();

  }

ngOnInit() {
    console.log('pasa emp 1');
    if (this.authenticationService.getCurrentUser() != null) {
      this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
    }
    this.getList();
  }

getList(): void {
    console.log('pasa emp 2');
    this.servicioService
      .getDataPropietario()
      .subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        this.dataSource.data = res['data'] as IPropietario[];
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


    this.dialog.open(AgregaPropietarioComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
  }

actualiza(id: string, rutPropietario: string, nombres: string, apellidoPaterno: string, apellidoMaterno: string, direccion: string,
          telefono: string, email: string) {
    this.datoPar = {
      _id: id,
      rutPropietario,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      region: '',
      comuna: '',
      direccion,
      telefono,
      email,
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
    dialogConfig.data = this.datoPar;
    this.dialog.open(ModificaPropietarioComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
  }

consulta(id: string, rutPropietario: string, nombres: string, apellidoPaterno: string, apellidoMaterno: string, direccion: string,
         telefono: string, email: string) {
    this.datoPar = {
      _id: id,
      rutPropietario,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      region: '',
      comuna: '',
      direccion,
      telefono,
      email,
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
    this.dialog.open(ConsultaPropietarioComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
 }

elimina(id: string, rutPropietario: string, nombres: string, apellidoPaterno: string, apellidoMaterno: string, direccion: string,
        telefono: string, email: string) {
    this.datoPar = {
      _id: id,
      rutPropietario,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      region: '',
      comuna: '',
      direccion,
      telefono,
      email,
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
    this.dialog.open(EliminaPropietarioComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data === 1) {
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

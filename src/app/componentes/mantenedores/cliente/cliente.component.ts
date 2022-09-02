import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import {ICliente} from '../../../modelo/cliente-interface';
import {ClienteService } from '../../../servicios/cliente.service';

import { JwtResponseI } from '../../../autentica/_models';
import { AuthenticationService } from '../../../autentica/_services';

import Swal from 'sweetalert2';
import { AgregaClienteComponent } from './agrega-cliente/agrega-cliente.component';
import { ModificaClienteComponent } from './modifica-cliente/modifica-cliente.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';
import { EliminaClienteComponent } from './elimina-cliente/elimina-cliente.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  currentUsuario!: JwtResponseI;
  exampleDatabase!: ClienteService;
 // id: string;

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['index', 'empresa.rutCliente', 'empresa.razonSocial', 'empresa.nombreFantasia', 'empresa.direccion', 'empresa.telefono', 'empresa.email', 'empresa.nombreContacto', 'opciones'];
  dataSource: MatTableDataSource<ICliente>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  show:boolean=true;
  datoClienteEmpresa!: ICliente[];
  datoClienteEmpresaOriginal!: ICliente[];


constructor(private clienteService: ClienteService,
            public httpClient: HttpClient,
            public dialog: MatDialog,
            private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
      this.dataSource = new MatTableDataSource<ICliente>([]);

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
    await this.getListClienteTodo();
    await this.getListCliente();

    // Permite ordenar cuando es estructura anidada
    this.dataSource.sortingDataAccessor = (item:any, property:any) => {
      switch(property) {
        case 'empresa.rutCliente': return item.empresa[0].rutCliente;
        case 'empresa.razonSocial': return item.empresa[0].razonSocial;
        case 'empresa.nombreFantasia': return item.empresa[0].nombreFantasia;
        case 'empresa.direccion': return item.empresa[0].direccion;
        case 'empresa.telefono': return item.empresa[0].telefono;
        case 'empresa.email': return item.empresa[0].email;
        case 'empresa.nombreContacto': return item.empresa[0].nombreContacto;
        default: return item[property];
      }
    };
  }

async getListCliente() {
    console.log('pasa emp 2:',this.currentUsuario.usuarioDato.empresa.empresa_Id);
    this.clienteService
      .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe((res) => {
        console.log('cliente2: ', res['data'] as ICliente[]);
        this.datoClienteEmpresa=res['data'] as ICliente[];
        for(let a=0; a<this.datoClienteEmpresa.length; a++){
         // for(let b=0; b<this.datoClienteEmpresa[a].empresa!.length; b++){

           //  if (this.datoClienteEmpresa![a].empresa![a].empresa_Id != this.currentUsuario.usuarioDato.empresa.empresa_Id){
             this.datoClienteEmpresa![a].empresa = this.datoClienteEmpresa![a].empresa!.filter(x=> x.empresa_Id === this.currentUsuario.usuarioDato.empresa.empresa_Id)
           //  }
          // }
        }

    //   this.datoClienteEmpresa.empresa = this.datoClienteEmpresa.empresa!.filter(x=> x.empresa_Id === this.currentUsuario.usuarioDato.empresa.empresa_Id)
        console.log('this.datoClienteEmpresa.empresa:', this.datoClienteEmpresa);
        console.log('cliente original ultimo: ', this.datoClienteEmpresaOriginal);
        this.dataSource.data = this.datoClienteEmpresa;
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

  async getListClienteTodo() {

    this.clienteService
      .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id)
      .subscribe((res) => {
        console.log('cliente1: ', res['data'] as ICliente[]);
        this.datoClienteEmpresaOriginal=res['data'] as ICliente[];
        console.log('cliente original: ', this.datoClienteEmpresaOriginal);
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


    this.dialog.open(AgregaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
  }

actualizaCliente(datoClientePar: ICliente): void {
  console.log('datos actualiza:',datoClientePar)
  let datoCliente = {
    datoClientePar: datoClientePar,
    datoClienteEmpresaOriginal:this.datoClienteEmpresaOriginal,
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
    dialogConfig.data = datoCliente;
    this.dialog.open(ModificaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );

  }

consultaCliente(datoClientePar: ICliente) {
    console.log('consulta cliente:',datoClientePar);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = datoClientePar;
    this.dialog.open(ConsultaClienteComponent, dialogConfig)
    .afterClosed().subscribe(
     data => {console.log('Datoas Consulta:', data);
              if (data === 1) {
                  this.refreshTable();
              }
      }
    );
 }

eliminaCliente(datoClientePar: ICliente) {
  let datoCliente = {
    datoClientePar: datoClientePar,
    datoClienteEmpresaOriginal:this.datoClienteEmpresaOriginal,
    usuarioModifica_id: this.currentUsuario.usuarioDato._id
  };

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '70%';
    dialogConfig.position = { top : '5%'};

    dialogConfig.data = datoCliente;
    this.dialog.open(EliminaClienteComponent, dialogConfig)
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

   await this.getListCliente();
   this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
  }
}

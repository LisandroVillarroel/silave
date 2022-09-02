import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { IUsuario } from '@app/modelo/usuario-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';
import Swal from 'sweetalert2';
import { AgregaUsuariosEmpresaComponent } from './agrega-usuarios-empresa/agrega-usuarios-empresa.component';
import { ConsultaUsuariosEmpresaComponent } from './consulta-usuarios-empresa/consulta-usuarios-empresa.component';
import { EliminaUsuariosEmpresaComponent } from './elimina-usuarios-empresa/elimina-usuarios-empresa.component';
import { ModificaUsuariosEmpresaComponent } from './modifica-usuarios-empresa/modifica-usuarios-empresa.component';

@Component({
  selector: 'app-usuarios-empresa',
  templateUrl: './usuarios-empresa.component.html',
  styleUrls: ['./usuarios-empresa.component.css']
})
export class UsuariosEmpresaComponent implements OnInit {

  currentUsuario!: JwtResponseI;
  // id: string;

   // tslint:disable-next-line:max-line-length
   displayedColumns: string[] = ['index', 'usuario','rutUsuario','nombres', 'apellidoPaterno', 'rutEmpresa', 'tipoEmpresa', 'estadoUsuario', 'opciones'];
   dataSource: MatTableDataSource<IUsuario>;

   @ViewChild(MatPaginator ) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;


 constructor(private usuarioLabService: UsuarioLabService,
             private empresaService: EmpresaService,
             public httpClient: HttpClient,
             public dialog: MatDialog,
             private authenticationService: AuthenticationService
     ) {
       this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
       this.dataSource = new MatTableDataSource<IUsuario>();

   }


 ngOnInit() {
     console.log('pasa ficha 1');
     if (this.authenticationService.getCurrentUser() != null) {
       this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
     }
     this.getListUsuario();

   }

 getListUsuario(): void {
     console.log('pasa ficha 2');
     this.usuarioLabService
       .getDataUsuarioTodo()
       .subscribe(res => {
         console.log('usuario: ', res['data']);
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

 agregaNuevo() {
   //  agregaNuevo(empresaInterface_: EmpresaI) {
     // Nuevo
     console.log('usu:', this.currentUsuario.usuarioDato._id);
     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '90%';
     dialogConfig.height = '90%';
     dialogConfig.position = { top : '3%'};
     dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id, empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,rutEmpresa:this.currentUsuario.usuarioDato.empresa.rutEmpresa};
   //  dialogConfig.data = {
   //    idProducto: idProdP,
   //    titulo: tituloP
   //  };


     this.dialog.open(AgregaUsuariosEmpresaComponent, dialogConfig)
     .afterClosed().subscribe(
      data => {console.log('Dialog output3333:', data);
              if (data === 1) {
                   this.refreshTable();
               }
       }
     );
   }

 actualizaFicha(datoUsuario:IUsuario) {

    console.log('edit usuario:',datoUsuario);
     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '90%';
     dialogConfig.height = '90%';
     dialogConfig.position = { top : '3%'};

     dialogConfig.data = datoUsuario;
     this.dialog.open(ModificaUsuariosEmpresaComponent, dialogConfig)
     .afterClosed().subscribe(
      data => {console.log('Dialog output3333:', data);
               if (data === 1) {
                   this.refreshTable();
               }
       }
     );

   }

 consultaFicha(datoUsuario:IUsuario) {

     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '90%';
     dialogConfig.height = '90%';
     dialogConfig.position = { top : '3%'};

     dialogConfig.data = datoUsuario;
     this.dialog.open(ConsultaUsuariosEmpresaComponent, dialogConfig)
     .afterClosed().subscribe(
      data => {console.log('Datoas Consulta:', data);
               if (data === 1) {
                   this.refreshTable();
               }
       }
     );
  }

  reseteaContrasena(datoUsuario:IUsuario) {



     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '90%';
     dialogConfig.height = '90%';
     dialogConfig.position = { top : '3%'};

     dialogConfig.data = datoUsuario;
     this.dialog.open(EliminaUsuariosEmpresaComponent, dialogConfig)
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

    this.getListUsuario();
    this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
   }
 }

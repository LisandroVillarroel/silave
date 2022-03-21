import { catchError } from 'rxjs/operators';
  import {Component, OnInit, ViewChild} from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {MatTableDataSource} from '@angular/material/table';
  import {MatSort} from '@angular/material/sort';
  import {MatPaginator} from '@angular/material/paginator';
  import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

  import Swal from 'sweetalert2';

  import { AuthenticationService } from '../../..//autentica/_services';
  import { JwtResponseI } from './../../../autentica/_models';

import { AgregaPerfilUsuarioComponent } from './agrega-perfil-usuario/agrega-perfil-usuario.component';
import { ModificaPerfilUsuarioComponent } from './modifica-perfil-usuario/modifica-perfil-usuario.component';
import { ConsultaPerfilUsuarioComponent } from './consulta-perfil-usuario/consulta-perfil-usuario.component';
import { EliminaPerfilUsuarioComponent } from './elimina-perfil-usuario/elimina-perfil-usuario.component';
import { IUsuario } from '@app/modelo/usuario-interface';
import { UsuarioLabService } from '@app/servicios/usuario-lab.service';


@Component({
  selector: 'app-perfiles-usuario',
  templateUrl: './perfiles-usuario.component.html',
  styleUrls: ['./perfiles-usuario.component.css']
})
export class PerfilesUsuarioComponent implements OnInit {


      currentUsuario!: JwtResponseI;
     // id: string;

      // tslint:disable-next-line:max-line-length
      displayedColumns: string[] = ['index', 'usuario','rutUsuario','nombres', 'apellidoPaterno', 'estadoUsuario', 'opciones'];
      dataSource: MatTableDataSource<IUsuario>;

      @ViewChild(MatPaginator ) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;


    constructor(private usuarioLabService: UsuarioLabService,
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
          .getDataUsuario(this.currentUsuario.usuarioDato.empresa.empresa_Id)
          .subscribe(res => {
            console.log('usuario: ', res);
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
        dialogConfig.width = '80%';
        dialogConfig.height = '85%';
        dialogConfig.position = { top : '2%'};
        dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id, empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,rutEmpresa:this.currentUsuario.usuarioDato.empresa.rutEmpresa};
      //  dialogConfig.data = {
      //    idProducto: idProdP,
      //    titulo: tituloP
      //  };


        this.dialog.open(AgregaPerfilUsuarioComponent, dialogConfig)
        .afterClosed().subscribe(
         data => {console.log('Dialog output3333:', data);
                  if (data !== undefined) {
                      this.refreshTable();
                  }
          }
        );
      }

    actualizaFicha(datoUsuario:IUsuario) {


        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '70%';
        dialogConfig.height = '70%';
        dialogConfig.position = { top : '5%'};

        dialogConfig.data = datoUsuario;
        this.dialog.open(ModificaPerfilUsuarioComponent, dialogConfig)
        .afterClosed().subscribe(
         data => {console.log('Dialog output3333:', data);
                  if (data !== undefined) {
                      this.refreshTable();
                  }
          }
        );

      }

    consultaFicha(datoUsuario:IUsuario) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '50%';
        dialogConfig.height = '70%';
        dialogConfig.position = { top : '5%'};

        dialogConfig.data = datoUsuario;
        this.dialog.open(ConsultaPerfilUsuarioComponent, dialogConfig)
        .afterClosed().subscribe(
         data => {console.log('Datoas Consulta:', data);
                  if (data !== undefined) {
                      this.refreshTable();
                  }
          }
        );
     }

     reseteaContrasena(datoUsuario:IUsuario) {



        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '50%';
        dialogConfig.height = '70%';
        dialogConfig.position = { top : '5%'};

        dialogConfig.data = datoUsuario;
        this.dialog.open(EliminaPerfilUsuarioComponent, dialogConfig)
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

       this.getListUsuario();
       this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
      }
    }

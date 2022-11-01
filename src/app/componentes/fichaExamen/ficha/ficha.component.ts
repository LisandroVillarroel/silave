import { IEmpresa } from '@app/modelo/empresa-interface';
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
import { IFicha } from './../../../modelo/ficha-interface';
import { FichaService } from './../../../servicios/ficha.service';
import { AgregaFichaComponent } from './agrega-ficha/agrega-ficha.component';
import { ModificaFichaComponent } from './modifica-ficha/modifica-ficha.component';
import { ConsultaFichaComponent } from './consulta-ficha/consulta-ficha.component';
import { EliminaFichaComponent } from './elimina-ficha/elimina-ficha.component';
import { EmpresaService } from '@app/servicios/empresa.service';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {



    datoFichaPar!: IFicha;
    currentUsuario!: JwtResponseI;
    datoEmpresa!:IEmpresa;
   // id: string;

    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['index', 'fichaC.numeroFicha','fichaC.cliente.nombreFantasia', 'fichaC.nombrePaciente', 'fichaC.examen.nombre', 'fechaHora_crea', 'fechaHora_recepciona_crea', 'estadoFicha', 'opciones'];
    dataSource: MatTableDataSource<IFicha>;

    @ViewChild(MatPaginator ) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


  constructor(private fichaService: FichaService,
              private empresaService: EmpresaService,
              private clienteService: ClienteService,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService
      ) {
        this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
        this.dataSource = new MatTableDataSource<IFicha>();

        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }

    }


  async ngOnInit() {
      console.log('pasa ficha 1');
      if (this.authenticationService.getCurrentUser() != null) {
        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      }
      await this.getListFicha();
      await this.getEmpresa();
      await this.listaVeterinarias();

      this.dataSource.sortingDataAccessor = (item:any, property:any) => {
        switch(property) {
          case 'fichaC.numeroFicha': return item.fichaC.numeroFicha;
          case 'fichaC.cliente.nombreFantasia':return item.fichaC.cliente.nombreFantasia;
          case 'fichaC.nombrePaciente': return item.fichaC.nombrePaciente;
          case 'fichaC.examen.nombre': return item.fichaC.examen.nombre;
          default: return item[property];
        }
      };
    }

  listaVeterinarias(){
    this.clienteService
    .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe((res) => {
      console.log('cliente2: ', res['data'] as ICliente[]);
/*
      for(let a=0; a<this.datoClienteEmpresa.length; a++){

           this.datoClienteEmpresa![a].empresa = this.datoClienteEmpresa![a].empresa!.filter(x=> x.empresa_Id === this.currentUsuario.usuarioDato.empresa.empresa_Id)

      }
*/

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
  );
  }

  getListFicha(): void {
      console.log('pasa ficha 2');
      this.fichaService
        .getDataFicha(this.currentUsuario.usuarioDato.empresa.empresa_Id,'Ingresado,Solicitado,Recepcionado',this.currentUsuario.usuarioDato._id,'Laboratorio')
        .subscribe(res => {
          console.log('fichaaaaaa: ', res);
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

    getEmpresa(): void {
      console.log('pasa ficha 2');
      this.empresaService
        .getDataEmpresa(this.currentUsuario.usuarioDato.empresa!.empresa_Id)
        .subscribe(res => {
          this.datoEmpresa = res['data'][0] as IEmpresa;
          console.log('empresaaaa:',this.datoEmpresa)
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
      dialogConfig.data = {usuario: this.currentUsuario.usuarioDato._id, empresa_Id:this.currentUsuario.usuarioDato.empresa.empresa_Id,rutEmpresa:this.currentUsuario.usuarioDato.empresa.rutEmpresa,idCliente: this.currentUsuario.usuarioDato.cliente?.idCliente,datoIngreso:this.datoEmpresa,tipoEmpresa:'Laboratorio'};
    //  dialogConfig.data = {
    //    idProducto: idProdP,
    //    titulo: tituloP
    //  };


      this.dialog.open(AgregaFichaComponent, dialogConfig)
      .afterClosed().subscribe(
       data => {console.log('Dialog output3333:', data);
                if (data === 1) {
                    this.refreshTable();
                }
        }
      );
    }

  actualizaFicha(datoFicha:any) {
      this.datoFichaPar = datoFicha;

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '70%';
      dialogConfig.height = '70%';
      dialogConfig.position = { top : '5%'};

      dialogConfig.data = this.datoFichaPar;
      this.dialog.open(ModificaFichaComponent, dialogConfig)
      .afterClosed().subscribe(
       data => {console.log('Dialog output3333:', data);
                if (data === 1) {
                    this.refreshTable();
                }
        }
      );

    }

  consultaFicha(datoFicha:any) {
    this.datoFichaPar = datoFicha;

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.height = '70%';
      dialogConfig.position = { top : '5%'};

      dialogConfig.data = this.datoFichaPar;
      this.dialog.open(ConsultaFichaComponent, dialogConfig)
      .afterClosed().subscribe(
       data => {console.log('Datoas Consulta:', data);
                if (data === 1) {
                    this.refreshTable();
                }
        }
      );
   }

  eliminaCliente(datoFicha:any) {
    console.log('dato elimina antes de eliminar:',datoFicha)
    this.datoFichaPar = datoFicha;
    console.log('dato elimina antes de eliminar2:',this.datoFichaPar)
  //  this.datoFichaPar.usuarioModifica_id= this.currentUsuario.usuarioDato._id

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.height = '70%';
      dialogConfig.position = { top : '5%'};

      dialogConfig.data = this.datoFichaPar;
      this.dialog.open(EliminaFichaComponent, dialogConfig)
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

     this.getListFicha();
     this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
    }
  }

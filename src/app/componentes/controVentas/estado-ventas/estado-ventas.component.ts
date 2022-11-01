

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

import { EmpresaService } from '@app/servicios/empresa.service';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';


@Component({
  selector: 'app-estado-ventas',
  templateUrl: './estado-ventas.component.html',
  styleUrls: ['./estado-ventas.component.css']
})
export class EstadoVentasComponent implements OnInit {



    datoFichaPar!: IFicha;
    currentUsuario!: JwtResponseI;
    datoEmpresa!:IEmpresa;
   // id: string;

    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['index', 'fichaC.numeroFicha','fichaC.cliente.nombreFantasia', 'fichaC.nombrePaciente', 'fichaC.examen.nombre', 'fechaHora_crea', 'facturacion.estadoFacturacion', 'fichaC.examen.precioValor','fichaC.examen.precioValorFinal','opciones'];
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
        .getDataFicha(this.currentUsuario.usuarioDato.empresa.empresa_Id,'Enviado,Pendiente',this.currentUsuario.usuarioDato._id,'Laboratorio')
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




      private refreshTable() {
      // Refreshing table using paginator
      // Thanks yeager-j for tips
      // https://github.com/marinantonio/angular-mat-table-crud/issues/12
     // this.dataSource.paginator._changePageSize(this.paginator.pageSize);
     // this.noticia=this.servicio.getNoticias();

     this.getListFicha();
     this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
    }

    agregaNuevo(){

    }

    actualizaFicha(){}

    consultaFicha(){}

    eliminaCliente(){}
  }

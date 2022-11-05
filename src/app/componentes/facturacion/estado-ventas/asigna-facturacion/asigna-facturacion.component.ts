

import { IEmpresa } from '@app/modelo/empresa-interface';
import { catchError } from 'rxjs/operators';
import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';

import Swal from 'sweetalert2';



import { EmpresaService } from '@app/servicios/empresa.service';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';
import { FacturacionService } from '@app/servicios/facturacion.service';
import { IFicha } from '@app/modelo/ficha-interface';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';


@Component({
  selector: 'app-asigna-facturacion',
  templateUrl: './asigna-facturacion.component.html',
  styleUrls: ['./asigna-facturacion.component.css']
})
export class AsignaFacturacionComponent implements OnInit {



    datoFichaFacturado: IFicha[]=[];
    datoFicha: IFicha[]=[];
    currentUsuario!: JwtResponseI;
    datoEmpresa!:IEmpresa;
   // id: string;

    // tslint:disable-next-line:max-line-length
    displayedColumns: string[] = ['index', 'fichaC.numeroFicha', 'fichaC.examen.nombre', 'fechaHora_crea', 'fichaC.examen.precioValor','fichaC.examen.precioValorFinal'];
    dataSource: MatTableDataSource<IFicha>;

    displayedColumnsFacturado: string[] = ['index', 'fichaC.numeroFicha', 'fichaC.examen.nombre', 'fechaHora_crea', 'fichaC.examen.precioValor','fichaC.examen.precioValorFinal'];
    dataSourceFacturado: MatTableDataSource<IFicha>;

    @ViewChild('paginator' ) paginator!: MatPaginator;
    @ViewChild('sort') sort!: MatSort;

    @ViewChild('paginatorFacturado' ) paginatorFacturado!: MatPaginator;
    @ViewChild('sortFacturado') sortFacturado!: MatSort;

  constructor(private facturacionService: FacturacionService,
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

        this.dataSourceFacturado = new MatTableDataSource<IFicha>();
        this.dataSourceFacturado.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }

    }


  async ngOnInit() {
      console.log('pasa ficha 1');
      if (this.authenticationService.getCurrentUser() != null) {
        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      }
      await this.getListFacturaFicha();

      this.dataSource.sortingDataAccessor = (item:any, property:any) => {
        switch(property) {
          case 'fichaC.numeroFicha': return item.fichaC.numeroFicha;
          case 'fichaC.cliente.nombreFantasia':return item.fichaC.cliente.nombreFantasia;
          case 'fichaC.examen.nombre': return item.fichaC.examen.nombre;
          default: return item[property];
        }
      };

      this.dataSourceFacturado.data=[];
      this.dataSourceFacturado.sortingDataAccessor = (item:any, property:any) => {
        switch(property) {
          case 'fichaC.numeroFicha': return item.fichaC.numeroFicha;
          case 'fichaC.cliente.nombreFantasia':return item.fichaC.cliente.nombreFantasia;
          case 'fichaC.examen.nombre': return item.fichaC.examen.nombre;
          default: return item[property];
        }
      };
    }



  async getListFacturaFicha() {
      console.log('pasa ficha 2');
      this.facturacionService
        .getDataFichaFactura(this.currentUsuario.usuarioDato.empresa.empresa_Id,'Pendiente',this.currentUsuario.usuarioDato._id,'Laboratorio')
        .subscribe(res => {
          console.log('fichaaaaaa: ', res);
          this.datoFicha= res['data'] as any[];
           this.datoFicha.sort(function
            (a, b) {
              if (a.fichaC.id_Ficha! > b.fichaC.id_Ficha!) {
                return 1;
              }
              if (a.fichaC.id_Ficha! < b.fichaC.id_Ficha!) {
                return -1;
              }
              // a must be equal to b
              return 0;
            }
          );
          this.dataSource.data = this.datoFicha;
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

      this.dataSourceFacturado.paginator = this.paginatorFacturado;
      this.dataSourceFacturado.sort = this.sortFacturado;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

    applyFilterFacturado(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceFacturado.filter = filterValue.trim().toLowerCase();

          if (this.dataSourceFacturado.paginator) {
            this.dataSourceFacturado.paginator.firstPage();
          }
      }



    private refreshTable() {


      this.dataSource.data=this.datoFicha;
      this.dataSource.sort = this.sort;

      const sortState: Sort = {active: 'fichaC.numeroFicha', direction: 'asc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);

      this.dataSource.paginator!._changePageSize(this.paginator.pageSize);
    }

    private refreshTableFacturado() {



      this.dataSourceFacturado.data=this.datoFichaFacturado;

      this.dataSource.sort = this.sortFacturado;

      const sortState: Sort = {active: 'fichaC.numeroFicha', direction: 'asc'};
      this.sortFacturado.active = sortState.active;
      this.sortFacturado.direction = sortState.direction;
      this.sortFacturado.sortChange.emit(sortState);

      this.dataSourceFacturado.paginator!._changePageSize(this.paginatorFacturado.pageSize);
     }

    async  agregaFacturado(row:IFicha){

      this.datoFicha=this.datoFicha.filter((i) => i._id !== row._id);
      this.refreshTable();

     await  this.datoFichaFacturado.push(row)
      this.refreshTableFacturado();
    }

    async  eliminaFacturado(row:IFicha){
       await  this.datoFicha.push(row)
       this.refreshTable();

       this.datoFichaFacturado=this.datoFichaFacturado.filter((i) => i._id !== row._id);
       this.refreshTableFacturado();
    }


  }

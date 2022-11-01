import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IComparaAnterior } from '@app/interfaz/gestion-interface';
import { GestionService } from '@app/servicios/gestion.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-compara',
  templateUrl: './barra-compara.component.html',
  styleUrls: ['./barra-compara.component.css']
})
export class BarraComparaComponent implements OnInit {
  @Input()
  anoMes!: any;

  @Input()
  clienteVet!: any;

  currentUsuario!: JwtResponseI;
  comparaAnterior!:IComparaAnterior;

  multi!:IComparaAnterior[];

  //multi: any[];
  view: [number,number] = [700, 400];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Meses';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Ventas';
  legendTitle: string = '';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    , group: ScaleType.Ordinal, selectable: true, name: 'Customer Usage',

  };

  anoP!:number;
  mesP!:number;

  constructor( private gestionService:GestionService,
               private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    }

    ngOnInit(): void {
      if (this.authenticationService.getCurrentUser() != null) {
        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      }

      console.log('cliente Vet',this.clienteVet);
      console.log('mes ano',this.anoMes);
      this.mesP= this.anoMes.month()+1;
      this.anoP= this.anoMes.year();
      console.log('ano:',this.anoP)
      console.log('mes:',this.mesP)
      this.getComparaVentasAnoAnterior(this.mesP,this.anoP,this.clienteVet)


    }

 onSelect(data:any): void {
   // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
  //  console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
  //  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  getComparaVentasAnoAnterior(mesP:any,anoP:any,clienteVet:any){
    console.log('ano compara:',anoP)
    this.gestionService
      .getDataComparaVentasAnoAnterior(anoP,mesP,this.currentUsuario.usuarioDato.empresa.empresa_Id,clienteVet)
      .subscribe((res) => {
        this.multi=  res['data']
        console.log('data generallll: ', this.multi );


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

  recepcionaPadreCompara(mesAno:any,clienteVet:any){
    console.log('cliente Vet',clienteVet);
    console.log('mes ano',mesAno);
    this.mesP= mesAno.value.month()+1;
    this.anoP= mesAno.value.year();
    console.log('ano:',this.anoP)
    console.log('mes:',this.mesP)
    this.getComparaVentasAnoAnterior(this.mesP,this.anoP,clienteVet)
  }

}

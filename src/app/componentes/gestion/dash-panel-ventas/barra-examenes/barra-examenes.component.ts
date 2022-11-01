import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';
import { IVentaExamen } from '@app/interfaz/gestion-interface';
import { GestionService } from '@app/servicios/gestion.service';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-examenes',
  templateUrl: './barra-examenes.component.html',
  styleUrls: ['./barra-examenes.component.css']
})
export class BarraExamenesComponent implements OnInit {

 /* multi = [
    {
      "name": "Hemograma",
      "series": [
        {
          "name": "2021",
          "value": 2000000
        },
        {
          "name": "2022",
          "value": 1500000
        }
      ]
    },

    {
      "name": "Perfil Bioquímico",
      "series": [
        {
          "name": "2021",
          "value": 1900000
        },
        {
          "name": "2022",
          "value": 1800000
        }
      ]
    },

    {
      "name": "Pruebas de Coagulación",
      "series": [
        {
          "name": "2021",
          "value": 2100000
        },
        {
          "name": "2022",
          "value": 2000000
        }
      ]
    },

  ];
*/
@Input()
anoMes!: any;

@Input()
clienteVet!: any;

currentUsuario!: JwtResponseI;
ventaExamen!:IVentaExamen;

multi!:IVentaExamen[];
  //multi: any[];
  view: [number,number] = [700, 400];


  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Exámenes';
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
    this.getVentaExamen(this.mesP,this.anoP,this.clienteVet)


  }

 onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getVentaExamen(mesP:any,anoP:any,clienteVet:any){
    console.log('ano compara:',anoP)
    this.gestionService
      .getVentaExamen(anoP,mesP,this.currentUsuario.usuarioDato.empresa.empresa_Id,clienteVet)
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
    this.getVentaExamen(this.mesP,this.anoP,clienteVet)
  }
}

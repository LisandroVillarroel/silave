import { Component, Input, OnInit } from '@angular/core';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IVentaDia } from '@app/interfaz/gestion-interface';
import { GestionService } from '@app/servicios/gestion.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-dias',
  templateUrl: './barra-dias.component.html',
  styleUrls: ['./barra-dias.component.css']
})
export class BarraDiasComponent implements OnInit {
/*
  single = [
    {
      "name": "01/09/2022",
      "value": 100001
    },
    {
      "name": "02/09/2022",
      "value": 100002
    },
    {
      "name": "03/09/2022",
      "value": 100003
    },
    {
      "name": "04/09/2022",
      "value": 100004
    },
    {
      "name": "05/09/2022",
      "value": 100005
    },
    {
      "name": "06/09/2022",
      "value": 100006
    },
    {
      "name": "07/09/2022",
      "value": 100007
    },
    {
      "name": "08/09/2022",
      "value": 100008
    },
    {
      "name": "09/09/2022",
      "value": 100009
    },
    {
      "name": "10/09/2022",
      "value": 100010
    },
    {
      "name": "11/09/2022",
      "value": 100011
    },
    {
      "name": "12/09/2022",
      "value": 100012
    },
    {
      "name": "13/09/2022",
      "value": 100013
    },
    {
      "name": "14/09/2022",
      "value": 100014
    },
    {
      "name": "15/09/2022",
      "value": 100015
    },
    {
      "name": "16/09/2022",
      "value": 100016
    },
    {
      "name": "17/09/2022",
      "value": 100017
    },
    {
      "name": "18/09/2022",
      "value": 100018
    },
    {
      "name": "19/09/2022",
      "value": 100019
    },
    {
      "name": "20/09/2022",
      "value": 100020
    },
    {
      "name": "21/09/2022",
      "value": 100021
    },
    {
      "name": "22/09/2022",
      "value": 100022
    },
    {
      "name": "23/09/2022",
      "value": 100023
    },
    {
      "name": "24/09/2022",
      "value": 100024
    },
    {
      "name": "25/09/2022",
      "value": 100025
    },
    {
      "name": "26/09/2022",
      "value": 100026
    },
    {
      "name": "27/09/2022",
      "value": 100027
    },
    {
      "name": "28/09/2022",
      "value": 100028
    },
    {
      "name": "29/09/2022",
      "value": 100029
    },
    {
      "name": "30/09/2022",
      "value": 100030
    },
  ];
*/
  @Input()
  anoMes!: any;

  @Input()
  clienteVet!: any;

  currentUsuario!: JwtResponseI;
  ventaDias!:IVentaDia;

  single!:IVentaDia[];

  view: [number,number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'Días';
  showYAxisLabel: boolean = false;
  xAxisLabel: string = 'Population';

  colorScheme: Color = {
    domain: ['#99CCE5', '#FF7F7F'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
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
  this.getVentaDia(this.mesP,this.anoP,this.clienteVet)
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



  getVentaDia(mesP:any,anoP:any,clienteVet:any){
    console.log('ano compara:',anoP)
    this.gestionService
      .getVentaDia(anoP,mesP,this.currentUsuario.usuarioDato.empresa.empresa_Id,clienteVet)
      .subscribe((res) => {
        this.single=  res['data']
        console.log('data generallll: ', this.single );


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
    this.getVentaDia(this.mesP,this.anoP,clienteVet)
  }


  formatDataLabel(value:any )
  {
   // console.log('valor',value)
    let formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    //let res =
    return formatter.format(value)
  }
}

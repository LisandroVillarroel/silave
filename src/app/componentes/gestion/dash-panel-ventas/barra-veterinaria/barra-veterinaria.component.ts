import { Component, Input, OnInit } from '@angular/core';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IVentaCliente } from '@app/interfaz/gestion-interface';
import { GestionService } from '@app/servicios/gestion.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-veterinaria',
  templateUrl: './barra-veterinaria.component.html',
  styleUrls: ['./barra-veterinaria.component.css']
})
export class BarraVeterinariaComponent implements OnInit {

  /*single = [
    {
      "name": "Veterinaria 1",
      "value": 100001
    },
    {
      "name": "Veterinaria 2",
      "value": 100002
    },
    {
      "name": "veterinaria 3",
      "value": 100003
    },
    {
      "name": "Veterinaria 4",
      "value": 100004
    },
    {
      "name": "Veterinaria 5",
      "value": 100005
    },
    {
      "name": "Veterinaria 6",
      "value": 100006
    },
    {
      "name": "Veterinaria 7",
      "value": 100007
    },
    {
      "name": "Veterinaria 8",
      "value": 100008
    },
    {
      "name": "Veterinaria 9",
      "value": 100009
    },
    {
      "name": "Veterinaria 10",
      "value": 100010
    },


  ];

*/
  @Input()
  anoMes!: any;

  @Input()
  clienteVet!: any;

  currentUsuario!: JwtResponseI;


  single!:IVentaCliente[];
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
  this.getVentaCliente(this.mesP,this.anoP,this.clienteVet)
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

  getVentaCliente(mesP:any,anoP:any,clienteVet:any){
    console.log('ano compara:',anoP)
    this.gestionService
      .ventasPorCliente(anoP,mesP,this.currentUsuario.usuarioDato.empresa.empresa_Id,clienteVet)
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
    this.getVentaCliente(this.mesP,this.anoP,clienteVet)
  }

  formatDataLabel(value:any )
  {
    //console.log('valor',value)
    let formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    //let res =
    return formatter.format(value)
  }
}

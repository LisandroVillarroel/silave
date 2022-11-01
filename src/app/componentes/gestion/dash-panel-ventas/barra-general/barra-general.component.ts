import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtResponseI } from '@app/autentica/_models';
import { AuthenticationService } from '@app/autentica/_services';
import { IGestionGeneral, IGestionGrafico } from '@app/interfaz/gestion-interface';
import { GestionService } from '@app/servicios/gestion.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { animationFrameScheduler } from 'rxjs';
import Swal from 'sweetalert2';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-barra-general',
  templateUrl: './barra-general.component.html',
  styleUrls: ['./barra-general.component.css']
})
export class BarraGeneralComponent implements OnInit {

  @Input()
  anoMes!: any;

  @Input()
  clienteVet!: any;

  currentUsuario!: JwtResponseI;
  gestionGeneral!:IGestionGeneral;

  single!:IGestionGrafico[];

  view: [number,number] = [700, 400];



  colorScheme: Color = {
    domain: ['#5AA454', '#E44D25'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
};


  cardColor: string = '#000000';


  anoP!:number;
  mesP!:number;
  constructor( private gestionService:GestionService,
               private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    }

  onSelect(event:any) {
    console.log(event);
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
    this.getValorGeneral(this.mesP,this.anoP,this.clienteVet)


  }

  formatDataLabel(value:any )
  {
    let formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    //let res =
    return formatter.format(value.value)
  }

  getValorGeneral(mesP:any,anoP:any,clienteVet:any){
    this.gestionService
      .getDataGestionGeneral(anoP,mesP,this.currentUsuario.usuarioDato.empresa.empresa_Id,clienteVet)
      .subscribe((res) => {
        this.gestionGeneral=  res['data']
        console.log('data general: ', this.gestionGeneral );
        this.single! = [
          {
            "name": String(anoP),
            "value":  this.gestionGeneral.valorAnualGeneralTotal
          },
          {
            "name": this.obtenerNombreMes(mesP),
            "value":  this.gestionGeneral.valorAnualGeneralMesTotal
          }
        ];

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


  recepcionaPadre(mesAno:any,clienteVet:any){
    console.log('cliente Vet',clienteVet);
    console.log('mes ano',mesAno);
    this.mesP= mesAno.value.month()+1;
    this.anoP= mesAno.value.year();
    console.log('ano:',this.anoP)
    console.log('mes:',this.mesP)
    this.getValorGeneral(this.mesP,this.anoP,clienteVet)
  }

  obtenerNombreMes (numero:number) {
   let mesLetra=''
   if(numero===1)
      mesLetra='Enero'
   else if(numero===2)
      mesLetra='Febrero'
    else if (numero===3)
      mesLetra='Marzo'
    else if (numero===4)
      mesLetra='Abril'
    else if (numero===5)
      mesLetra='Mayo'
    else if (numero===6)
      mesLetra='Junio'
    else if (numero===7)
      mesLetra='Julio'
    else if (numero===8)
      mesLetra='Agosto'
    else if (numero===9)
      mesLetra='Septiembre'
    else if (numero===10)
      mesLetra='Octubre'
    else if (numero===11)
      mesLetra='Noviembre'
    else
      mesLetra='Diciembre'

    return mesLetra;
  }
}

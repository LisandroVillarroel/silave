import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import {UntypedFormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl, FormGroup} from '@angular/forms';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { ClienteService } from '@app/servicios/cliente.service';
import { ICliente } from '@app/modelo/cliente-interface';
import { AuthenticationService } from '@app/autentica/_services';
import { JwtResponseI } from '@app/autentica/_models';
import Swal from 'sweetalert2';
import { BarraGeneralComponent } from './barra-general/barra-general.component';
import { BarraComparaComponent } from './barra-compara/barra-compara.component';
import { BarraExamenesComponent } from './barra-examenes/barra-examenes.component';
import { BarraDiasComponent } from './barra-dias/barra-dias.component';
import { BarraVeterinariaComponent } from './barra-veterinaria/barra-veterinaria.component';

const moment = _rollupMoment || _moment;
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-dash-panel-ventas',
  templateUrl: './dash-panel-ventas.component.html',
  styleUrls: ['./dash-panel-ventas.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DashPanelVentasComponent {
  @ViewChild('selector1')
  BarraGeneralHijo!: BarraGeneralComponent
  @ViewChild('selector2')
  getComparaVentasAnoAnterior!: BarraComparaComponent
  @ViewChild('selector3')
  getVentaExamen!: BarraExamenesComponent
  @ViewChild('selector4')
  getVentaDia!: BarraDiasComponent
  @ViewChild('selector5')
  getVentaCliente!: BarraVeterinariaComponent

  datoCliente!: ICliente[];
  currentUsuario!: JwtResponseI;


  /** Based on the screen size, switch from standard to one column per row */
  anoMes = new UntypedFormControl(moment());


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.anoMes.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.anoMes.setValue(ctrlValue);
    datepicker.close();
    console.log('paso',this.anoMes)
    this.BarraGeneralHijo.recepcionaPadre(this.anoMes,this.formClienteVet.get('cliente')!.value);
    this.getComparaVentasAnoAnterior.recepcionaPadreCompara(this.anoMes,this.formClienteVet.get('cliente')!.value);
    this.getVentaExamen.recepcionaPadreCompara(this.anoMes,this.formClienteVet.get('cliente')!.value);
    this.getVentaDia.recepcionaPadreCompara(this.anoMes,this.formClienteVet.get('cliente')!.value);
    this.getVentaCliente.recepcionaPadreCompara(this.anoMes,this.formClienteVet.get('cliente')!.value);
  }

  cliente = new FormControl('Todos');
  formClienteVet = new FormGroup({
    cliente: this.cliente,
  });


  constructor(private breakpointObserver: BreakpointObserver,
    private clienteService: ClienteService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.currentUsuario.subscribe(x => this.currentUsuario = x);
    }

    async ngOnInit() {
      console.log('pasa ficha 1',this.anoMes);
      if (this.authenticationService.getCurrentUser() != null) {
        this.currentUsuario.usuarioDato = this.authenticationService.getCurrentUser() ;
      }
      this.cargaCliente()
    }

  cargaCliente(){
    this.clienteService
    .getDataCliente(this.currentUsuario.usuarioDato.empresa.empresa_Id)
    .subscribe(res => {

      this.datoCliente = res['data'] ;

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

  async seleccionaVeterinaria(p: any){
    console.log('dats cliente:',p)

    console.log( 'anomes:',this.anoMes);

    this.BarraGeneralHijo.recepcionaPadre(this.anoMes,p);
    this.getComparaVentasAnoAnterior.recepcionaPadreCompara(this.anoMes,p);
    this.getVentaExamen.recepcionaPadreCompara(this.anoMes,p);
    this.getVentaDia.recepcionaPadreCompara(this.anoMes,p);
    this.getVentaCliente.recepcionaPadreCompara(this.anoMes,p);
    return;
  }


}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprime-ficha-cabecera',
  templateUrl: './imprime-ficha-cabecera.component.html',
  styleUrls: ['./imprime-ficha-cabecera.component.css']
})
export class ImprimeFichaCabeceraComponent implements OnInit {
  @Input()
  public datoFichaRecibeFicha!: any;


  constructor() {

  }

  ngOnInit(): void {
    console.log('ficha imprime:',this.datoFichaRecibeFicha);
  }

}

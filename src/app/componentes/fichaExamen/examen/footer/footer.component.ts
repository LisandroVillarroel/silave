import { Component, Input, OnInit } from '@angular/core';
import { IExamen } from '@app/modelo/examen-interface';
import { ExamenService } from '@app/servicios/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input()
  public datoFichaRecibeFicha!: any;
  imagen='./../../../../../../assets/imagenes/';

  datoExamen!:IExamen;

  constructor(private examenService:ExamenService) { }

  ngOnInit(): void {
    console.log('dato footerr:',this.datoFichaRecibeFicha.fichaC);
    this.imagen= this.imagen+this.datoFichaRecibeFicha.empresa.rutEmpresa+'/'+this.datoFichaRecibeFicha.fichaC.examen.nombreExamen // agregar a estructura data.nomreArchivo
  }
/*
  getExamen()  {
    console.log('footer:',this.datoFichaRecibeFicha);
    this.examenService
      .getDataExamen(this.datoFichaRecibeFicha.fichaC.examen.idExamen)
      .subscribe(res => {

        this.datoExamen = res['data'][0] as IExamen;

        this.imagen= this.imagen+this.datoFichaRecibeFicha.empresa.rutEmpresa+'/'+this.datoExamen?.nombreExamen  // agregar a estructura data.nomreArchivo

      },

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
*/
}

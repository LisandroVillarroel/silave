import { Component, Input, OnInit } from '@angular/core';
import { IEmpresa } from '@app/modelo/empresa-interface';
import { EmpresaService } from '@app/servicios/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  public datoFichaRecibeFicha!: any;

  imagen='./../../../../../../assets/imagenes/';
  show=false;
  constructor( private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.imagen= this.imagen+this.datoFichaRecibeFicha.empresa.rutEmpresa+'/'+this.datoFichaRecibeFicha.empresa?.nombreLogo  // agregar a estructura data.nomreArchivo
    console.log('imagen logo:',this.imagen)
    console.log('dato recibe head:',this.datoFichaRecibeFicha);
  }

  /*getEmpresa()  {
    console.log('head:',this.datoFichaRecibeFicha);
    this.empresaService
      .getDataEmpresa(this.datoFichaRecibeFicha.empresa.empresa_Id)
      .subscribe(res => {

        this.datoEmpresa = res['data'][0] as IEmpresa;
        console.log('head empresa:',this.datoEmpresa);

        console.log('head empresa imagen:',this.imagen);
        this.show=true
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

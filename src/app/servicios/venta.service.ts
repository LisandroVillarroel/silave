import { Injectable } from '@angular/core';
import { Venta } from './../modelo/venta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor() { }

  detalleVenta: Venta[] = [
    {codigoBarra: 'BKY00001', cantidad: 0, detalleProd: 'Producto 1', descuento: 0, precio: 1000},
    {codigoBarra: 'BKY00002', cantidad: 0, detalleProd: 'Producto 2', descuento: 0, precio: 2000},
    {codigoBarra: 'BKY00003', cantidad: 0, detalleProd: 'Producto 3', descuento: 0, precio: 3000},
    ];

  detalleVenta$: BehaviorSubject<Venta[]> = new BehaviorSubject(this.detalleVenta);

  update(index:any, field:any, value:any) {
    console.log(index, field, value);
    this.detalleVenta = this.detalleVenta.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        };
      }
      return e;
    });
    this.detalleVenta$.next(this.detalleVenta);
  }

  getControl(index:any, fieldName:any) {
  }
}

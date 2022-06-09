import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResultado } from '@app/modelo/examen-interface';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  public url_servidor =  "http://localhost/silavePhp/";
	public url_servidor2 =  "./../../../";


	constructor(private http: HttpClient){}

	uploadFile(archivo:any) {
    console.log('foto arch:',archivo);
    console.log('ruta:',this.url_servidor);
		return this.http.post<IResultado>('/src/silavePhp/subeArchivo.php', JSON.stringify(archivo));

  }

}

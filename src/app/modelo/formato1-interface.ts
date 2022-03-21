export interface IFormato1 {
  _id?: string;
  nombreFormato: string;
  formato?: [{
    nombreTitulo: string;
    cuadros: [{
      titulo: string;
      titulos1: ITitulos1;
      titulos2: ITitulos2;
      datos: IDatos[];
    }];
  }];
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  estado?: string;
}

export interface ITitulos1 {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
}

export interface ITitulos2 {
  campo1: string;
  campo2: string;
  campo3: string;
  campo4: string;
  campo5: string;
}

export interface IDatos {
campo1: string;
ingresoSN1: string;
campo2: string;
ingresoSN2: string;
campo3: string;
ingresoSN3: string;
campo4: string;
ingresoSN4: string;
campo5: string;
ingresoSN5: string;
}


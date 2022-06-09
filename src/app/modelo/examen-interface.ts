export interface IExamen {
  _id?: string;
  codigoExamen: string;
  codigoInterno?: number;
  nombre: string;
  sigla: string;
  precio: number;
  nombreExamen?: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa_Id?: string;
  estado?: string;
  }

  export interface IResultado {
    resultado?: string;
    mensaje: string;
  }

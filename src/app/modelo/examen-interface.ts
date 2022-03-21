export interface IExamen {
  _id?: string;
  codigoExamen: string;
  codigoInterno?: number;
  nombre: string;
  sigla: string;
  precio: number;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa_Id?: string;
  estado?: string;
  }


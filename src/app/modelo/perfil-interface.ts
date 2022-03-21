export interface PerfilI {
  _id: string;
  empresa_id: string;
  sigla: string;
  descripcion: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  estado?: string;
  }

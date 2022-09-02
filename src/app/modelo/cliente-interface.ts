export interface ICliente {
  _id?: string;
  rutCliente?: string;
  razonSocial?: string;
  nombreFantasia?: string;
  direccion?: string;
  telefono?: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa?: IClienteEmpresa[];
  tipoEmpresa?: string;
  emailRecepcionExamenCliente?: string;
  estado?: string;
}

export interface IClienteEmpresa {
  _id?: string;
  empresa_Id?: string
  rutCliente?: string;
  razonSocial: string;
  nombreFantasia: string;
  direccion: string;
  telefono: string;
  email: string;
  nombreContacto: string;
  menu_Id?: string;
  envioEmail?:IEmailCliente;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  estado?: string;
}

export interface IEmailCliente {
  emailEnvio?: string;
  password?:string;
  nombreDesde?:string;
  asunto?: string;
  tituloCuerpo?:string;
  tituloCuerpoMedio?:string;
  tituloCuerpoPie?:string;
}

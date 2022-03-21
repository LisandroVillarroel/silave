export interface IEmpresa {
  _id?: string;
  rutEmpresa: string;
  razonSocial: string;
  nombreFantasia: string;
  direccion: string;
  nombreContacto: string;
  telefono:string;
  email:string;
  envioCorreo?:ICorreo;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  estado?: string;
}

export interface ICorreo {
  emailEnvio?: string;
  password?:string;
  nombreDesde?:string;
  asunto?: string;
  tituloCuerpo?:string;
  tituloCuerpoMedio?:string;
  tituloCuerpoPie?:string;
}

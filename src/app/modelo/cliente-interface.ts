export interface ICliente {
  _id?: string;
  rutCliente: string;
  razonSocial: string;
  nombreFantasia: string;
  direccion: string;
  telefono: string;
  email: string;
  nombreContacto: string;
  emailEnvioExamenCliente: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa_Id?: string;
  tipoEmpresa?: string;
  menu_Id?: string;
  estado?: string;
}

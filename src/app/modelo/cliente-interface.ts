export interface ICliente {
  _id?: string;
  rutCliente: string;
  razonSocial: string;
  nombreFantasia: string;
  direccion: string;
  telefono: string;
  email: string;
  nombreContacto: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa_Id?: string;
  estado?: string;
}

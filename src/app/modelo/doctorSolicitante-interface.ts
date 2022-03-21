export interface IDoctorSolicitante {
  _id?: string;
  cliente:ICliente_
  nombre: string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  empresa_Id?: string;
  estado?: string;
}

export interface ICliente_ {
  idCliente: string;
  nombreFantasia: string;
}

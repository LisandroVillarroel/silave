import { MenuItem } from "./menu-interface";

  export interface IUsuario {
  _id?: string;
  usuario?: string;
  contrasena?: string;
  rutUsuario: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  empresa?: IUsuarioEmpresa;
  cliente?: IUsuarioCliente;
  telefono?: string;
  email?: string;
  direccion?:string;
  MenuItem?: MenuItem[];
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  estadoUsuario?:string;  //Activo - Inactivo
  estado?: string;
}

export interface IUsuarioEmpresa {
  empresa_Id:string;
  rutEmpresa: string;
  menu_Id: string;
  tipoEmpresa?: string;
}

export interface IUsuarioCliente {
  idCliente?: string;
  nombreFantasia?:string;
}



export interface IUsuarioContrasena {
  _id?: string;
  contrasenaActual?: string;
  contrasena?: string;
  usuarioModifica_id?: string;
}

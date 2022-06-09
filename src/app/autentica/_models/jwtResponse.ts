import { IUsuarioCliente, IUsuarioEmpresa } from "@app/modelo/usuario-interface";

export interface JwtResponseI {
  usuarioDato: {
    _id: string,
    usuario: string,
    contrasena: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    empresa:IUsuarioEmpresa,
    cliente?: IUsuarioCliente;
    accessToken: string
  };
}


export interface JwtResponseI {
  usuarioDato: {
    _id: string,
    usuario: string,
    contrasena: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    empresa:IUsuarioEmpresa,
    accessToken: string
  };
}


export interface IUsuarioEmpresa {
  empresa_Id:string,
  rutEmpresa: string
}

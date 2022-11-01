import { IHemograma } from "./examenHemograma-interface";
import { IPerfilBioquimico } from "./examenPerfilBioquimico-interface";
import { IPruebasDeCoagulacion } from "./examenPruebasDeCoagulacion";

export interface IFicha {
  _id?: string;
  fichaC:{
    id_Ficha?: string;
    numeroFicha?: string;
    cliente?:IFichaCliente;
    rutPropietario?: string;
    nombrePropietario?: string;
    nombrePaciente?: string;
    edadPaciente?: string;
    especie?: IFichaEspecie;
    raza?: IFichaRaza;
    sexo?: string;
    doctorSolicitante?:IFichaDoctorSolicitante;
    examen?:IFichaExamen;
    validador?:IFichaValidador;
    correoClienteFinal?: string;
  },
  formatoResultado?:{
   // examen:IFichaExamen;

    hemograma?:IHemograma;
    perfilBioquimico?:IPerfilBioquimico;
    pruebasDeCoagulacion?: IPruebasDeCoagulacion;
  };


  datoArchivo?:IdatoArchivo;

  usuarioAsignado?:IFichaUsuarioAsignado;
  empresa?: IFichaEmpresa;
  ingresadoPor?:IIngresadoPor;
  facturacion?:IFacturacion;
  estadoFicha?:string;
  usuarioCrea_id?: string;
  usuarioModifica_id?: string;
  usuarioEnviaCrea_id?: string;
  usuarioEnviaModifica_id?: string;
  usuarioRecepcionaCrea_id?: string;
  fechaHora_envia_crea?: Date;
  fechaHora_envia_modifica?:Date;
  fechaHora_recepciona_crea?: Date;
  estado?: string;

}
export interface IFichaCliente {
  idCliente?:string;
  rutCliente?: string;
  razonSocial?: string;
  nombreFantasia?: string;
  correoRecepcionCliente?:string;
}

export interface IFichaExamen {
  idExamen:string;
  codigoExamen: string;
  codigoInterno: string;
  nombre: string;
  nombreExamen?: string;
  precioValor?: string;
  precioValorFinal?: string;
}


export interface IFichaEspecie {
  idEspecie:string;
  nombre: string;
}

export interface IFichaRaza {
  idRaza:string;
  nombre: string;
}

export interface IFichaDoctorSolicitante {
  idDoctorSolicitante: string;
  nombreDoctorSolicitante: string;
}

export interface IdatoArchivo {
  nombreArchivo:string;
  archivo64:string;
}

export interface IFichaUsuarioAsignado {
    idUsuario?: string;
    usuario?: string;
    rutUsuario?: string;
    nombreCompleto?: string;
}


export interface IFichaEmpresa {
  empresa_Id?:string;
  rutEmpresa?: string;
  nombreLogo?: string;
}


export interface IIngresadoPor {
  tipoEmpresa?:string;            //Administrador, Laboratorio, Veterinaria
  idIngreso?:string;
  rutIngreso?: string;
  razonSocial?: string;
  nombreFantasia?: string;
}


export interface IFichaValidador{
  idValidador: string;
  rutValidador: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono:string;
  profesion:string;
  nombreFirma?:string;
}

export interface IFacturacion{
estadoFacturacion?:string;
fechaFacturacion?:Date;
fechaPagoFacturacion?:Date;
}

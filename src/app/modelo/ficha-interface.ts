import { IHemograma } from "./examenHemograma-interface";

export interface IFicha {
  _id?: string;
  fichaC:{
    numeroFicha?: string;
    cliente?:IFichaCliente;
    nombrePropietario?: string;
    nombrePaciente?: string;
    edadPaciente?: string;
    especie?: IFichaEspecie;
    raza?: IFichaRaza;
    sexo?: string;
    doctorSolicitante?:IFichaDoctorSolicitante;
    examen?:IFichaExamen;
  },
  formatoResultado?:{
    examen:IFichaExamen;
    hemograma?:IHemograma;
  };
  datoArchivo?:IdatoArchivo;

  usuarioAsignado?:IFichaUsuarioAsignado;
  empresa?: IFichaEmpresa;
  estadoFicha?:string;
  usuarioCrea_id?: string;
  usuarioModifica_id: string;
  usuarioEnviaCrea_id?: string;
  usuarioEnviaModifica_id?: string;
  fechaHora_envia_crea?: string;
  fechaHora_envia_modifica?:string;
  estado?: string;
}
export interface IFichaCliente {
  idCliente?:string;
  rutCliente?: string;
  razonSocial?: string;
  nombreFantasia?: string;
}

export interface IFichaExamen {
  idExamen:string;
  codigoExamen: string;
  nombre: string;
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
    idUsuario: string;
    usuario: string;
    rutUsuario: string;
    nombreCompleto: string;
}


export interface IFichaEmpresa {
  empresa_Id?:string;
  rutEmpresa?: string;
}

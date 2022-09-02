export interface IPerfilBioquimico {
  resultado:IResultado[];
  observaciones: string;

}

export interface IResultado {
  parametro: string;
  resultado: string;
  unidad: string;
  caninos: string;
  felinos: string;
  flag:boolean;
}

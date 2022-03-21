export interface IHemograma {
  serieRoja:{
    IHemogramaSerieRoja:IHemogramaSerieRoja[];
  }
  serieBlanca:{
    IHemogramaSerieBlanca:IHemogramaSerieBlanca[];
  }
  total: number;
  eritrocitos: string;
  leucocitos: string;
  plaquetas: string;

}

export interface IHemogramaSerieRoja {
  parametro: string;
  resultado: string;
  unidad: string;
  caninos: string;
  felinos: string;
}

export interface IHemogramaSerieBlanca {
  parametro: string;
  resultadoPrc: string;
  resultadoNum: string;
  caninos: string;
  felinos: string;
}

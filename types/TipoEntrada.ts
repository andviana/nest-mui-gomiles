import { Entrada } from "./Entrada";

export interface TipoEntrada {  
  id?:number,
  descricao:string,
  entradas?:Entrada[],
}

export function createTipoEntrada(  
  descricao: string,
  id?: number,
  entradas?: Entrada[],  
): TipoEntrada {
  return {
    id,
    descricao,
    entradas,    
  };
}



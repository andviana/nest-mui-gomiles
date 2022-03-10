import { TipoEntrada } from "../../types/TipoEntrada";
import formatValue from "../../utility/formatValue";

interface IResumoTipoEntrada {
    tipoEntrada: TipoEntrada,
    countEntradas: number,
    valorTotalEntradas: number,
    valorTotalEntradasFormatado: string,
}

export const resumoListaTipoEntrada = (dados: TipoEntrada[]): IResumoTipoEntrada[] => {
    if (!dados || !(dados.length > 0))
        return [] as IResumoTipoEntrada[];
    const resultado = dados.map(item => {
        const { entradas  } = item;        
        if (!entradas)
            return {
                tipoEntrada:item,
                countEntradas: 0,
                valorTotalEntradas: 0,
                valorTotalEntradasFormatado: formatValue(0),
            } as IResumoTipoEntrada;
        const countEntradas = entradas.length;
        const valorTotalEntradas = (!entradas) ? 0 : entradas.reduce((acc, curr) => acc + +curr.valor, 0);
        return {
            tipoEntrada:item,
            countEntradas,
            valorTotalEntradas,
            valorTotalEntradasFormatado: formatValue(valorTotalEntradas),
        } as IResumoTipoEntrada;
    })
    return resultado || [] as IResumoTipoEntrada[];
}
import { BASE_URL, RESOURCES } from "../../config/apiConfig";
import api from "../../services/api";
import { TipoEntrada } from "../../types/TipoEntrada";

const url = `${BASE_URL}${RESOURCES.tipoEntradas}`;

export const getTipoEntradas = async (): Promise<TipoEntrada[]> => {    
    const res = await api.get(url);    
    return res.data ?? [] as TipoEntrada[];
}

export const getTipoEntradasResumo = async (): Promise<TipoEntrada[]> => {
    const urlCustom = `${BASE_URL}${RESOURCES.tipoEntradasResumo}`;
    const res = await api.get(urlCustom);    
    return res.data ?? [] as TipoEntrada[];
}

export const cadastrarTipoEntrada = async (data:TipoEntrada): Promise<TipoEntrada> =>{
    const res = await api.post(url, data);
    return res.data ?? {} as TipoEntrada;
}
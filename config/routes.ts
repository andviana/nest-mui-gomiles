const home = '/dashboard';
const list = '/list';
const create = '/create';
const edit = '/edit';
const tipoEntrada = '/tipo_entradas';
const tipoSaida = '/tipo_saidas';

export const routes = {
    home: home,

    tipoEntrada:{
        index:tipoEntrada,
        list:tipoEntrada+list,
        create:tipoEntrada+create,
        edit:tipoEntrada+edit,
    },

    tipoSaida:{
        index:tipoSaida
    }
    
}
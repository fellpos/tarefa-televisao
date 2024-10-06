import * as db from '../repository/programaFavRepository.js';

export async function inserirFavService(favorito) {
    let id = await db.inserirFav(favorito);
    
    return id;
}

export async function consultarFavService() {
    let registros = await db.consultarFav();
    
    return registros;
}

export async function consultarFavIdService(id) {
    let registros = await db.consultarFavId(id);
    
    return registros;
}

export async function alterarService(favorito, id) {
    let linhasAfetadas = await db.alterarFav(favorito, id);
    if (linhasAfetadas <= 0) 
        throw Error('Nenhum Favorito Encontrado');

    return linhasAfetadas;
}

export async function deletarService(id) {
    let linhasAfetadas = await db.deletarFav(id);
    if (linhasAfetadas <= 0)
        throw Error('Nenhum Favorito Encontrado');

    return linhasAfetadas;
}
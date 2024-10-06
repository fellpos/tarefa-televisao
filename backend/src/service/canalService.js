import * as db from '../repository/canalRepository.js';

export async function inserirService(canal) {
    let id = await db.inserirCanal(canal)

    return id;
}

export async function consultarService() {
    let registros = await db.consultarCanais()

    return registros;
}

export async function consultarIdService(id) {
    let registros = await db.consultarCanaisId(id)

    return registros;
}

export async function alterarService(canal, id) {
    let linhasAfetadas = await db.alterarCanal(canal, id)
    if (linhasAfetadas <= 0) 
        throw Error('Nenhum Canal Encontrado')

    return linhasAfetadas;
}

export async function deletarService(id) {
    let linhasAfetadas = await db.deletarCanal(id)
    if (linhasAfetadas <= 0)
        throw Error('Nenhum Canal Encontrado')

    return linhasAfetadas;
}
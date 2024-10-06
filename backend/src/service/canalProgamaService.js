import * as db from '../repository/canalProgramaRepository.js';

export async function inserirService(canalProgam) {
    let id = await db.inserirCanalProg(canalProgam)

    return id;
}

export async function consultarService() {
    let registros = await db.consultarCanaisProg()

    return registros;
}

export async function alterarService(canalProgam, id) {
    let linhasAfetadas = await db.alterarCanal(canalProgam, id)
    if (linhasAfetadas <= 0) 
        throw Error('Nenhum Programa Encontrado')

    return linhasAfetadas;
}

export async function deletarService(id) {
    let linhasAfetadas = await db.deletarCanal(id)
    if (linhasAfetadas <= 0)
        throw Error('Nenhum Programa Encontrado')

    return linhasAfetadas;
}
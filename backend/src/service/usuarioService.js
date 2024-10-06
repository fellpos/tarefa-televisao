import * as db from '../repository/usuarioRepository.js';

export async function inserirUserService(user) {
    let id = await db.inserirUser(user);

    return id;
}

export async function consultarUserService() {
    let registros = await db.consultarUser();

    return registros;
}

export async function alterarUserService(user, id) {
    let linhasAfetadas = await db.alterarUser(user, id);

    return linhasAfetadas;
}

export async function deletarUserService(id) {
    let linhasAfetadas = await db.deletarUser(id);
    if (linhasAfetadas <= 0) 
        throw Error('Nenhum Usuario Encontrado');

    return linhasAfetadas;
}
import con from './connection.js'

export async function inserirFav(favorito) {
    let comando = `
    INSERT INTO tb_programa_favorito (id_usuario, id_canal_programa, vl_avaliacao)
    VALUES (?, ?, ?)
    `

    let resposta = await con.query(comando, [favorito.id_usuario, favorito.id_canal_programa, favorito.avaliacao]);
    let info = resposta[0];

    return info.insertId;
}

export async function consultarFav() {
    let comando = `
        SELECT	pv.id_programa_favorito as id,
                u.nm_usuario            as usuario,
                cp.nm_programa          as nome_programa,
                pv.vl_avaliacao         as avaliacao
           FROM tb_programa_favorito pv 
        JOIN tb_usuario u ON pv.id_usuario = u.id_usuario 
        JOIN tb_canal_programa cp ON pv.id_canal_programa = cp.id_canal_programa;
    `

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function alterarFav(favorito, id) {
    let comando = `
         UPDATE tb_programa_favorito
            SET id_usuario              = ?,
                id_canal_programa       = ?,
                vl_avaliacao            = ?
          WHERE id_programa_favorito    = ?
    `

    let resposta = await con.query(comando, [favorito.id_usuario, favorito.id_canal_programa, favorito.avaliacao, id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function deletarFav(id) {
    let comando = `
        DELETE FROM  tb_programa_favorito
               WHERE id_programa_favorito = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
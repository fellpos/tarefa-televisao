import con from "./connection.js";

export async function inserirCanal(canal) {
    let comando = `
    INSERT INTO tb_canal (nm_canal, nr_canal, bt_aberto)
        VALUES (?, ?, ?) 
    `

    let resposta = await con.query(comando, [canal.nome, canal.num, canal.aberto]);
    let info = resposta[0];

    return info.insertId;
}

export async function consultarCanais() {
    let comando = `
        SELECT id_canal     id,
                nm_canal    nome,
                nr_canal    numero,
                bt_aberto   aberto
          FROM  tb_canal
    `

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function consultarCanaisId(id) {
    let comando = `
        SELECT id_canal     id,
                nm_canal    nome,
                nr_canal    numero,
                bt_aberto   aberto
          FROM  tb_canal
          WHERE id_canal    = ?
    `

    let resposta = await con.query(comando, [id]);
    let registros = resposta[0];

    return registros[0];
}

export async function alterarCanal(canal, id) {
    let comando = `
        UPDATE tb_canal
            SET nm_canal   = ?,
                nr_canal   = ?,
                bt_aberto  = ?
          WHERE id_canal = ?
    `

    let resposta = await con.query(comando, [canal.nome, canal.num, canal.aberto, id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function deletarCanal(id) {
    let comando = `
        DELETE FROM  tb_canal
               WHERE id_canal = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
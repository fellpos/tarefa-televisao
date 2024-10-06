import con from "./connection.js";

export async function inserirCanalProg(canalProgam) {
    let comando = `
    INSERT INTO tb_canal_programa (id_canal, nm_programa, ds_genero, hr_programa)
        VALUES (?, ?, ?, ?)
    `

    let resposta = await con.query(comando, [canalProgam.id_canal, canalProgam.nome, canalProgam.genero, canalProgam.horario]);
    let info = resposta[0];

    return info.insertId;
}

export async function consultarCanaisProg() {
    let comando = `
        SELECT id_canal_programa     id,
                nm_canal            canal,
                nm_programa         nome_programa,
                ds_genero           genero,
                hr_programa         horario
          FROM  tb_canal_programa
          INNER JOIN tb_canal on tb_canal_programa.id_canal = tb_canal.id_canal
    `

    let resposta = await con.query(comando);
    let registros = resposta[0];

    return registros;
}

export async function alterarCanal(canalProgam, id) {
    let comando = `
        UPDATE tb_canal_programa
            SET id_canal          = ?,
                nm_programa       = ?,
                ds_genero         = ?,
                hr_programa       = ?
          WHERE id_canal_programa = ?
    `

    let resposta = await con.query(comando, [canalProgam.id_canal, canalProgam.nome, canalProgam.genero, canalProgam.horario, id]);
    let info = resposta[0];

    return info.affectedRows;
}

export async function deletarCanal(id) {
    let comando = `
        DELETE FROM  tb_canal_programa
               WHERE id_canal_programa = ?
    `

    let resposta = await con.query(comando, [id]);
    let info = resposta[0];

    return info.affectedRows;
}
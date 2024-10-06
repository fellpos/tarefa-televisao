import { Router } from "express";
import * as db from '../service/usuarioService.js';

const endpoints = Router()

endpoints.post('/usuario', async (req,resp) => {
    try {
        let user = req.body;
        let id = await db.inserirUserService(user);
        resp.send({
            novoId: id
        });
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.get('/usuario', async (req,resp) => {
    try {
        let registros = await db.consultarUserService();

        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.get('/usuario/:id', async (req,resp) => {
    try {
        let id = req.params.id;
        let registros = await db.consultarUserIdService(id);

        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.put('/usuario/:id', async (req,resp) => {
    try {
        let id = req.params.id
        let user = req.body;
        await db.alterarUserService(user, id);

        resp.send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.delete('/usuario/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        await db.deletarUserService(id);

        resp.send()
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

export default endpoints;
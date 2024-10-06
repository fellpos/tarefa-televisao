import { Router } from "express";
import * as db from '../service/canalService.js';

const endpoints = Router();

endpoints.get('/canal', async (req, resp) => {
    try {
        let registros = await db.consultarService()

        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.get('/canal/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let registros = await db.consultarIdService(id);

        resp.send(registros)
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.post('/canal', async (req, resp) => {
    try {
        let canal = req.body;
        let id = await db.inserirService(canal)

        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.put('/canal/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let canal = req.body;
        await db.alterarService(canal, id)

        resp.send()
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.delete('/canal/:id', async (req, resp) => {
    try {
        let id = req.params.id
        await db.deletarService(id)

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
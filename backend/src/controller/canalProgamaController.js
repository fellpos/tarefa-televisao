import { Router } from "express";
import * as db from '../service/canalProgamaService.js';
const endpoints = Router()


endpoints.get('/canal/programa', async (req, resp) => {
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

endpoints.post('/canal/programa', async (req, resp) => {
    try {
        let canalProg = req.body;
        let id = await db.inserirService(canalProg);

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

endpoints.put('/canal/programa/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let canal = req.body;
        await db.alterarService(canal, id);

        resp.send()
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        console.log(err.message);
    }
})

endpoints.delete('/canal/programa/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        await db.deletarService(id);

        resp.send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})


export default endpoints;
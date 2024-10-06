import { Router } from "express";
import * as db from '../service/programaFavService.js';

const endpoints = Router();

endpoints.post('/fav', async (req, resp) => {
    try {
        let favorito = req.body;
        let id = await db.inserirFavService(favorito);
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

endpoints.get('/fav', async (req,resp) => {
    try {
        let registros = await db.consultarFavService();

        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.get('/fav/:id', async (req,resp) => {
    try {
        let id = req.params.id
        let registros = await db.consultarFavIdService(id);

        resp.send(registros);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.put('/fav/:id', async (req, resp) => {
    try {
        let id = req.params.id
        let favorito = req.body;

        await db.alterarService(favorito, id);
        resp.send();
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        });
        console.log(err.message);
    }
})

endpoints.delete('/fav/:id', async (req, resp) => {
    try {
        let id = req.params.id
        
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
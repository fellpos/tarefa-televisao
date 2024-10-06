import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

import adcionarRota from './routes.js'

adcionarRota(servidor) 

servidor.listen(
    process.env.PORTA,
    () => console.log('---> API subiu')
)
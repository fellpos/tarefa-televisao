import canalController from './controller/canalController.js';
import canalProgramaController from './controller/canalProgamaController.js';
import programaFavController from './controller/programaFavController.js';
import usuarioController from './controller/usuarioController.js';

export default function adcionarRotas(servidor) {
    servidor.use(canalController);
    servidor.use(canalProgramaController);
    servidor.use(programaFavController);
    servidor.use(usuarioController);
}
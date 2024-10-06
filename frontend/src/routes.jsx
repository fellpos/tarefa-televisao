import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Canal from "./pages/canal";
import CanalPrograma from "./pages/canal_programa";
import Usuario from "./pages/usuario";
import Favorito from "./pages/programa_fav";

export default function Navegacao() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/canal" element={<Canal />} />
                <Route path="/canal/:id" element={<Canal />} />

                <Route path="/canal/programa" element={<CanalPrograma />} />
                <Route path="/canal/programa/:id" element={<CanalPrograma />} />

                <Route path="/usuario" element={<Usuario />} />
                <Route path="/usuario/:id" element={<Usuario />} />

                <Route path="/favorito" element={<Favorito />} />
                <Route path="/favorito/:id" element={<Favorito />} />
            </Routes>
        </BrowserRouter>
    )
}
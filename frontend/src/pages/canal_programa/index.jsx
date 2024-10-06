import './index.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export default function CanalPrograma() {
    const [idCanal, setIdCanal] = useState(0);
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [horario, setHorario] = useState('');

    const [editando, setEditando] = useState(false);
    const [televisao, setTelevisao] = useState([]);

    const { id } = useParams();

    async function inserir() {
        let paramObj = {
            "id_canal": idCanal,
            "nome": nome,
            "genero": genero,
            "horario": horario
        }

        let url = 'http://localhost:7777/canal/programa';
        let resposta = await axios.post(url, paramObj);

        let novoId = resposta.data.novoId;

        alert(`Canal Cadastrado com Sucesso Id: ${novoId}`)
    }

    async function alterar() {
        let paramObj = {
            "id_canal": idCanal,
            "nome": nome,
            "genero": genero,
            "horario": horario
            }
            
            let url = `http://localhost:7777/canal/programa/${id}`
            await axios.put(url, paramObj)
            alert('Canal Alterado')
            }
            
            
    async function buscar() {
        if (!id) {
            let url = `http://localhost:7777/canal/programa`;
            let resposta = await axios.get(url);

            setTelevisao(resposta.data);
            setEditando(false)
        }
        else {
            let url = `http://localhost:7777/canal/programa/${id}`;
            let resposta = await axios.get(url);

            let urlS = `http://localhost:7777/canal/programa`;
            let lista = await axios.get(urlS);

            setTelevisao(lista.data);

            setNome(resposta.data.nome);
            setNome(resposta.data.nome);
            setNumero(resposta.data.numero);
            setAberto(resposta.data.aberto);
            setEditando(true)
        }
    }

    async function deletar() {
        let url = `http://localhost:7777/canal/programa/${id}`;
        let info = await axios.delete(url)
        alert(`Canal do Id: ${id} Deletado`)
    }


    return (
        <div className="pagina-canal-programa">
            <h1>Canal Programa</h1>


            <section>

                <h1>Inserir</h1>

                <form>
                    <div>
                        <label>Id do Canal</label>
                        <input type="text" value={idCanal} onChange={e => setIdCanal(e.target.value)} />
                    </div>
                    <div>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label>Gênero</label>
                        <input type="text" value={genero} onChange={e => setGenero(e.target.value)} />
                    </div>
                    <div>
                        <label>Horário</label>
                        <input type="time" value={horario} onChange={e => setHorario(e.target.value)} />
                    </div>
                    <button onClick={inserir}>Inserir</button>

                    {/* <button onClick={editando ? alterar : inserir}>{editando ? 'Alterar' : 'Inserir'}</button>
                    {editando &&
                        <button onClick={deletar}>deletar</button>
                    } */}

                </form>

            </section>

        </div>
    );
}
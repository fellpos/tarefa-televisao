import './index.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export default function Favorito() {
    const [idUsuario, setIdUsuario] = useState(0);
    const [idCanalPrograma, setIdCanalPrograma] = useState(0);
    const [avaliacao, setAvaliacao] = useState(0);

    const [editando, setEditando] = useState(false);
    const [televisao, setTelevisao] = useState([]);

    const { id } = useParams();

    async function inserir() {
        let paramObj = {
            "id_usuario": idUsuario,
            "id_canal_programa": idCanalPrograma,
            "avaliacao": avaliacao
        }
        let url = 'http://localhost:7777/fav';
        let resposta = await axios.post(url, paramObj);

        let novoId = resposta.data.novoId;

        alert(`Favorito Cadastrado com Sucesso Id: ${novoId}`)
    }

    async function alterar() {
        let paramObj = {
            "id_usuario": idUsuario,
            "id_canal_programa": idCanalPrograma,
            "avaliacao": avaliacao
        }
        let url = `http://localhost:7777/fav/${id}`
        await axios.put(url, paramObj)
        alert('Favorito Alterado')
    }


    async function buscar() {
        if (!id || isNaN(id)) {
            let url = `http://localhost:7777/fav`;
            let resposta = await axios.get(url);

            setTelevisao(resposta.data);
            setEditando(false)
        }
        else {
            let urlId = `http://localhost:7777/fav/${id}`;
            let resposta = await axios.get(urlId);

            let url = `http://localhost:7777/fav`;
            let lista = await axios.get(url);

            setTelevisao(lista.data);

            setIdUsuario(resposta.data.id_usuario);
            setIdCanalPrograma(resposta.data.id_canal_programa);
            setAvaliacao(resposta.data.avaliacao);
            setEditando(true);
        }
    }

    async function deletar() {
        let url = `http://localhost:7777/fav/${id}`;
        let info = await axios.delete(url);
        alert(`Favorito do Id: ${id} Deletado`);
    }

    useEffect(() => {
        buscar()
    }, [])


    return (
        <div className="pagina-favorito">
            <h1 className='titulo' style={{
                backgroundColor: '#F042FD',
                color: '#fff'
            }}>Tabela Favorito</h1>
            <h1><Link to={'/'}> voltar</Link></h1>

            <h1>id: {editando ? id : 'Nenhum Favorito Selecionado'}</h1>

            <section>

                <h1>Inserir</h1>

                <form>
                    <div>
                        <label>ID do Usuário :</label>
                        <input type="text" value={idUsuario} onChange={e => setIdUsuario(e.target.value)} />
                    </div>
                    <div>
                        <label>ID do Programa :</label>
                        <input type="text" value={idCanalPrograma} onChange={e => setIdCanalPrograma(e.target.value)} />
                    </div>
                    <div>
                        <label>Avaliação :</label>
                        <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} />
                    </div>

                    <button onClick={editando ? alterar : inserir}>{editando ? 'Alterar' : 'Inserir'}</button>
                    {editando &&
                        <button onClick={deletar}>deletar</button>
                    }
                </form>

            </section>

            <section>
                <h1>Consultar</h1> :
                <div className="tabela">

                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Uusario</th>
                                <th>Nome do Programa</th>
                                <th>Avaliação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {televisao.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.usuario}</td>
                                    <td>{item.nome_programa}</td>
                                    <td>{item.avaliacao}</td>
                                    <td><Link to={`/favorito/${item.id}`}>Clique Aqui</Link></td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </section>

        </div>
    );
}
import './index.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export default function Usuario() {
    const [nome, setNome] = useState('');

    const [editando, setEditando] = useState(false);
    const [televisao, setTelevisao] = useState([]);

    const { id } = useParams();

    async function inserir() {
        let paramObj = {
            "nome": nome
        }
        let url = 'http://localhost:7777/usuario';
        let resposta = await axios.post(url, paramObj);

        let novoId = resposta.data.novoId;

        alert(`Usuario Cadastrado com Sucesso Id: ${novoId}`)
    }

    async function alterar() {
        let paramObj = {
            "nome": nome
          }

        let url = `http://localhost:7777/usuario/${id}`
        await axios.put(url, paramObj)
        alert('Usuario Alterado')
    }


    async function buscar() {
        if (!id || isNaN(id)) {
            let url = `http://localhost:7777/usuario`;
            let resposta = await axios.get(url);

            setTelevisao(resposta.data);
            setEditando(false)
        }
        else {
            let urlId = `http://localhost:7777/usuario/${id}`;
            let resposta = await axios.get(urlId);

            let url = `http://localhost:7777/usuario`;
            let lista = await axios.get(url);

            setTelevisao(lista.data);
            setNome(resposta.data.nome);
            setEditando(true)
        }
    }

    async function deletar() {
        let url = `http://localhost:7777/usuario/${id}`;
        let info = await axios.delete(url)
        alert(`Usuario do Id: ${id} Deletado`)
    }

    useEffect(() => {
        buscar()
    }, [])


    return (
        <div className="pagina-usuario">
            <h1 className='titulo'>Tabela Usuário</h1>
            <h1><Link to={'/'}> voltar</Link></h1>

            <h1>id: {editando ? id : 'Nenhum Usuario Selecionado'}</h1>

            <section>

                <h1>Inserir</h1>

                <form>
                    <div>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>

                    <button onClick={editando ? alterar : inserir}>{editando ? 'Alterar' : 'Inserir'}</button>
                    {editando &&
                        <button onClick={deletar}>deletar</button>
                    }
                </form>

            </section>

            <section>
                <h1>Consultar</h1>
                <button onClick={buscar}>Clique Aqui</button>

                <div className="tabela">

                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Uusario</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {televisao.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td><Link to={`/usuario/${item.id}`}>Clique Aqui</Link></td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </section>

        </div>
    );
}
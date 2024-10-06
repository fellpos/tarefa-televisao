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

        alert(`Programa Cadastrado com Sucesso Id: ${novoId}`)
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
            alert('Programa Alterado')
            }
            
            
    async function buscar() {
        if (!id || isNaN(id)) {
            let url = `http://localhost:7777/programa`;
            let resposta = await axios.get(url);

            setTelevisao(resposta.data);
            console.log(televisao)
            setEditando(false)
        }
        else {
            let url = `http://localhost:7777/canal/programa/${id}`;
            let resposta = await axios.get(url);

            let urlS = `http://localhost:7777/programa`;
            let lista = await axios.get(urlS);

            setTelevisao(lista.data);

            setIdCanal(resposta.data.id);
            setNome(resposta.data.canal);
            setGenero(resposta.data.genero);
            setHorario(resposta.data.hoario);
            setEditando(true)
        }
    }

    async function deletar() {
        let url = `http://localhost:7777/canal/programa/${id}`;
        let info = await axios.delete(url)
        alert(`Programa do Id: ${id} Deletado`)
    }

    useEffect(() => {
        buscar()
    }, [])


    return (
        <div className="pagina-canal-programa">
            <h1 className='titulo'>Tabela Canal Programa</h1>            
            <h1><Link to={'/'}> voltar</Link></h1>

            <h1>id: {editando ? id : 'Nenhum Programa Selecionado'}</h1>
            
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
                                <th>id</th>
                                <th>Canal</th>
                                <th>Nome do Programa</th>
                                <th>Gênero</th>
                                <th>Horário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {televisao.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.canal}</td>
                                    <td>{item.nome_programa}</td>
                                    <td>{item.genero}</td>
                                    <td>{item.horario}</td>
                                    <td><Link to={`/canal/programa/${item.id}`}>Clique Aqui</Link></td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </section>

        </div>
    );
}
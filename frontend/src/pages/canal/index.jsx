import './index.scss';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

export default function Canal() {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState(0);
    const [aberto, setAberto] = useState(false);

    const [editando, setEditando] = useState(false);
    const [televisao, setTelevisao] = useState([]);

    const { id } = useParams();

    async function inserir() {
        let paramObj = {
            "nome": nome,
            "num": numero,
            "aberto": aberto
        }

        let url = 'http://localhost:7777/canal';
        let resposta = await axios.post(url, paramObj);

        let novoId = resposta.data.novoId;

        alert(`Canal Cadastrado com Sucesso Id: ${novoId}`)
    }

    async function alterar() {
        let paramObj = {
            "nome": nome,
            "num": numero,
            "aberto": aberto
        }

        let url = `http://localhost:7777/canal/${id}`
        await axios.put(url, paramObj)
        alert('Canal Alterado')
    }

    async function buscar() {
        if (!id) {
            let url = `http://localhost:7777/canal/`;
            let resposta = await axios.get(url);

            setTelevisao(resposta.data);
            setEditando(false)
        } 
        else {
            let url = `http://localhost:7777/canal/${id}`;
            let resposta = await axios.get(url);

            let urlS = `http://localhost:7777/canal/`;
            let lista = await axios.get(urlS);

            setTelevisao(lista.data);


            setNome(resposta.data.nome);
            setNumero(resposta.data.numero);
            setAberto(resposta.data.aberto);
            setEditando(true)
        }
    }

    async function deletar(id) {
        let url = `http://localhost:7777/canal/${id}`;
        let info = await axios.delete(url)
        alert(`Canal do Id: ${id} Deletado`)
    }

    useEffect(() => {
        buscar()

    },[])

    return (
        <div className="pagina-canal">
            <h1 className='titulo'>Canal</h1>
            <h1>id: {id}</h1>

            <section>

                <h1>Inserir</h1>

                <form>
                    <div>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label>Número</label>
                        <input type="text" value={numero} onChange={e => setNumero(e.target.value)} />
                    </div>
                    <div>
                        <label>Aberto?</label>
                        <input type="checkbox" value={aberto} onChange={e => setAberto(e.target.checked)} />
                    </div>
                    
                    <button onClick={editando ? alterar : inserir}>{editando ? 'Alterar' : 'Inserir'}</button>
                    <button onClick={deletar(id)}>deletar</button>
                
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
                                <th>Nome</th>
                                <th>Numero</th>
                                <th>Aberto</th>
                                <th>Alterar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {televisao.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.numero}</td>
                                    <td>{item.aberto ? 'Sim' : 'Não'}</td>
                                    <td><Link to={`/canal/${item.id}`}>Alterar</Link></td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </section>
        </div>
    );
}
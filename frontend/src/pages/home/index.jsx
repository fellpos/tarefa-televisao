import Cards from '../../components/cards';
import './index.scss';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="pagina-home">

            <div className="cards">

                <div>

                    <Cards
                        link='/canal'
                        titulo='Tabela Canal'
                        cor='#1A2A5A'
                    />
                    <Cards
                        link='/canal/programa'
                        titulo='Tabela Canal Programa'
                        cor='#A72235'
                        />
                </div>
                <div>

                    <Cards
                        link='/usuario'
                        titulo='Tabela Usuário'
                        cor='#652D5E'
                        />
                    <Cards
                        link='/favorito'
                        titulo='Tabela Favorito'
                        cor='#F042FD'
                    />
                </div>
            </div>
        </div>
    );
}
import './index.scss';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pagina-home">
        <Link to='/canal'>
            <a>Canal</a>
        </Link>
        <Link to='/canal/programa'>
            <a>Canal Programa</a>
        </Link>
        <Link to='/usuario'>
            <a>Usuario</a>
        </Link>
        <Link to='/favorito'>
            <a>Favorito</a>
        </Link>
    </div>
  );
}
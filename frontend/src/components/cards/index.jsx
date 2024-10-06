import './index.scss';
import { Link } from 'react-router-dom';

export default function Cards(props) {

    return (
        <Link to={`${props.link}`}>
            <div className='comps-card' style={{ backgroundColor: props.cor }}>
                <a>{props.titulo}</a>
            </div>
        </Link>
    )
}
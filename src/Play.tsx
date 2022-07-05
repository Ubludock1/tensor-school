import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TheContext} from './App';
import PlayType from './PlayType';
import useFetch from './useFetch';

const Play = () => {
    const navigate = useNavigate();
    const token = useContext(TheContext);
    const [play, setPlay] = useState<PlayType[]>({} as PlayType[]);
    const [name, setName] = useState('');

    let { item } = useParams<{ item: string }>();
    const first = useFetch("https://api.spotify.com/v1/browse/categories/" + item?.slice(1),token)
    const second = useFetch("https://api.spotify.com/v1/browse/categories/" + item?.slice(1) + "/playlists",token)
    Promise.all([first, second]).then(data=>{setName(data[0].name);setPlay(data[1].playlists?.items)});
        


    return (
        <div>
            <div className="main__content main__playlist-descr">
                <div className="playlist-content">
                    <h2 className="playlist-head">{name}</h2>
                </div>
            </div>
            <div className="main__content main__trek">
                <div className="main__playlist">
                    <ul className="main__content-list">
                        {play!==undefined&&play[0]!== undefined &&
                            play.map((Item) =>
                                <li key={Item.id.toString()} className='main__content-item'>
                                    <Link to={{ pathname: "/track:" + Item.id }}>
                                        <img className='main__content-img' src={Item.images[0].url.toString()} ></img>
                                        <h3 className='main__content-head'>
                                            {Item.name}
                                        </h3>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Play;
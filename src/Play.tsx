import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TheContext} from './App';

const Play = () => {
    const navigate = useNavigate();
    const token = useContext(TheContext);
    const [play, setPlay] = useState<{ images: [{ url: String }], name: String, id: Number }[]>(null as unknown as { images: [{ url: String }], name: String, id: Number }[]);
    const [name, setName] = useState('');

    let { item } = useParams<{ item: string }>();
    useEffect(() => {
        if (token !== '' && item !== undefined) {
            const first = fetch("https://api.spotify.com/v1/browse/categories/" + item.slice(1), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json()
                }
            }).then((data) => {
                setName(data.name);
            }).catch(function (error) {
                navigate("/eroor:"+error);
            });
            const second = fetch("https://api.spotify.com/v1/browse/categories/" + item.slice(1) + "/playlists", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                }
                else {
                    return res.json()
                }
            }).then((data) => {
                setPlay(data.playlists.items);

            }).catch(function (error) {
                navigate("/eroor:"+error);
            });
            Promise.all([first, second]);
        }
    }, [token, item])


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
                        {play.map((Item) =>
                            <li key={Item.id.toString()} className='main__content-item'>
                                <Link to={{ pathname: "/track:" + Item.id }}>
                                    <img className='main__content-img' src={Item.images[0].url.toString()} ></img>
                                    <h3 className='main__content-head'>
                                        {Item.name}
                                    </h3>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Play;
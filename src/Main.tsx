import { useContext, useEffect, useState } from 'react';
import sound from './Sound';
import { TheContext, Audio, ErrorContext } from './App';
import Error from './Erorr';


const Main = () => {
  const audio = useContext(Audio);
  const er = useContext(ErrorContext);
  const token = useContext(TheContext);
  const [album, setAlbum] = useState([{ images: [{ url: '' }], name: '', tracks: { items: [{ id: Number, preview_url: '', name: '' }] } }])
  useEffect(() => {
    fetch('https://api.spotify.com/v1/albums?ids=6aSk2vxoY3xtz7cXKuY9EL,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', {
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
      setAlbum(data.albums);
    }).catch(function (error) {
      Error(error, er);
    })
  }, [token]);

  return (
    <div className="main__content">
      {album.map((item) =>
        <div className='main__playlist'>
          <a className='main__playlist-link'>
            <h2 className='main__head'>{item.name}
            </h2>
          </a>
          <ul className='main__content-list'>
            {item.tracks.items.map((track) =>
              <li key={track.id.toString()} className='main__content-item'>
                <a className='main__content-item-link' onClick={() => sound(track, audio, er)}>
                  <img src={item.images[0].url} className='main__content-img'></img>
                  <h3 className='main__content-head'>{track.name}</h3>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Main;
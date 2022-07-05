import { useContext, useEffect, useState } from 'react';
import { TheContext} from './App';
import MyType from './Type';
import useFetch from './useFetch';
import { CurrentTrack } from './App';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const {src,setSrc} = useContext(CurrentTrack);
  const token = useContext(TheContext);
  const navigate = useNavigate();

  let data = useFetch('https://api.spotify.com/v1/albums?ids=6aSk2vxoY3xtz7cXKuY9EL,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',token)
  
  if(data===null ){
    return(<div></div>)
  }
  else{
    return (
      <div className="main__content">
        {data.albums?.map((item) =>
          <div key={item.id} className='main__playlist'>
            <a className='main__playlist-link'>
              <h2 className='main__head'>{item.name}
              </h2>
            </a>
            <ul className='main__content-list'>
              {item.tracks.items.map((track) =>
                <li key={track.id.toString()} className='main__content-item'>
                  <a className='main__content-item-link' onClick={() => {if(track.preview_url!==null){setSrc(track)}else{navigate("/eroor:"+"track")}}}>
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
}

export default Main;
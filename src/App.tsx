import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Main from './Main';
import Categories from './Categories';
import Play from './Play';
import Search from './Search';
import Track from './Tracks';
import Album from './Album';
import Pag from './Pag';
import SerachSvg from './SearchSvg';
import MediaSvg from './MediaSvg';
import PlusSvg from './PlusSvg';
import HeartSvg from './HeartSvg';
import TestError from './testEroor';
import Audioa from './Audio';
import MyType from './Type';
import AudioType from './AudioType';

export const TheContext = React.createContext<string>("");
export const CurrentTrack = React.createContext<AudioType>({} as AudioType );

function App() {
  const [src, setSrc] = useState<MyType>({} as MyType );
  const value = useMemo(() => ({ src, setSrc }), [src]);


  //Token
  const client_id = '7b8513be5c214d578cc12c924900f46e'; // Your client id
  const client_secret = '3400d157503c41b0a67fa2e04ef5bbfd'; // Your secret


  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      else {
        return res.json()
      }
    }).then((data) => {
      setToken(data.access_token);
    }).catch(function (error) {
      console.log(error);
  }) 

  }, [client_id, client_secret])
  

  return (
    <>
      <Router >
        <header className="header">
          <nav className="header__nav">
            <Link to="/"><img src="img/Spotifi.svg" className="logo" alt="logo"></img></Link>
            <ul className="header__list">
              <li className="header__item">
                <Link to="/" className="header__link-current"><img className="header__img" src="img/home.svg"></img>Главная</Link>
              </li>
              <li className="header__item">
                <Link to="/search" className="header__link"><SerachSvg />Поиск</Link>
              </li>
              <li className="header__item">
                <Link to="/media" className="header__link"><MediaSvg />Моя медиатека</Link>
              </li>
            </ul>
            <div className="header__creat">
              <button className="button-play buttonClear"><div className="creat-icon "><PlusSvg /></div>Создать плейлист</button>
              <button className="button-play buttonClear"><div className="creat-icon heart"><HeartSvg /></div>Любимые треки</button>
            </div>
            <div className="header__docs">
              <a className="header__docs-link" href="#">Файлы cooki</a>
              <a className="header__docs-link" href="#">Конфиденциальность</a>
              <a className="header__docs-link" href="#">Форма для Ваших обращений</a>
            </div>
          </nav>
        </header>
        <main className="main">
          <CurrentTrack.Provider value={value}>
              <TheContext.Provider value={token}>
                <nav className="main__nav">
                  <ul className="main__pag-list">
                    <Pag></Pag>
                    <Search />
                  </ul>
                  <div className="main_autho">
                    <button className="main__button login buttonClear">ВОЙТИ</button>
                  </div>
                </nav>
                <Routes>
                  <Route key="error" path='/eroor:status' element={<TestError/>}>
                  </Route>
                  <Route key="album" path='/album:tracks' element={<Album />}>
                  </Route>

                  <Route key="track" path="/track:tracks" element={<Track />}>
                  </Route>

                  <Route key="a" path="/a:item" element={<Play />}>
                  </Route>

                  <Route key="media" path="/media">
                  </Route>

                  <Route key="searc" path="/search" element={<Categories />}>
                  </Route>

                  <Route key="main" path="/" element={<Main />}>
                  </Route>

                </Routes>
                <Audioa/>
              </TheContext.Provider>
          </CurrentTrack.Provider>
        </main>
      </Router>
    </>
  );
}

export default App;
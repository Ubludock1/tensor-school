import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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


export const TheContext = React.createContext('');
export const ErrorContext = React.createContext(React.createRef<HTMLDivElement>());
export const Audio = React.createContext(React.createRef<HTMLDivElement>());

function App() {
  //Error
  const er = React.createRef<HTMLDivElement>();

  //Audio
  const av = React.createRef<HTMLAudioElement>();
  const playBtn = React.createRef<HTMLButtonElement>();
  const playTime = React.createRef<HTMLDivElement>();
  const curTime = React.createRef<HTMLInputElement>();
  const volPlus = React.createRef<HTMLButtonElement>();
  const volMinus = React.createRef<HTMLButtonElement>();
  const audioVisible = React.createRef<HTMLDivElement>();

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
    }).then((res) => res.json()).then((data) => {
      setToken(data.access_token);
    })

  }, [client_id, client_secret])

  return (
    <>
      <Router >
        <div ref={er} className="error__container">
          <h3 className="error__head">Ошибка!</h3>
          <p className="error__message">Тут написана какая-то ошибка</p>
          <button
            onClick={function () {
              er.current?.classList.toggle("display__flex");
            }}
            className="error__button buttonClear">
            OK
          </button>
        </div>
        <header className="header">
          <nav className="header__nav">
            <a href="#"><img src="img/Spotifi.svg" className="logo" alt="logo"></img></a>
            <ul className="header__list">
              <li key="/" className="header__item">
                <Link to="/" className="header__link-current"><img className="header__img" src="img/home.svg"></img>Главная</Link>
              </li>
              <li key="/search" className="header__item">
                <Link to="/search" className="header__link"><SerachSvg />Поиск</Link>
              </li>
              <li key="/media" className="header__item">
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
          <Audio.Provider value={audioVisible}>
            <ErrorContext.Provider value={er}>
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
              </TheContext.Provider>
            </ErrorContext.Provider>
          </Audio.Provider>
        </main>
        <div ref={audioVisible} data-playing="false" className="audio__visible">
          <button ref={playBtn}
            onClick={function () {
              if (audioVisible.current != null && av.current != null && playBtn.current != null) {
                if (audioVisible.current.getAttribute("data-playing") == "true") {
                  av.current.pause();
                  audioVisible.current.setAttribute("data-playing", "false");
                  playBtn.current.innerHTML = "►";
                }
                else {
                  av.current.play();
                  audioVisible.current.setAttribute("data-playing", "true");
                  playBtn.current.innerHTML = "❚❚";
                }
              }
            }}
            className="buttonClear play-btn">
            ►
          </button>
          <div className="play-name"></div>
          <input ref={curTime}
            onChange={function () {
              if (av.current != null && audioVisible.current != null && playBtn.current != null && curTime.current != null) {
                av.current.play();
                audioVisible.current.setAttribute("data-playing", "true");
                playBtn.current.innerHTML = "❚❚";
                av.current.currentTime = Number(curTime.current.value);
              }
            }}
            className="cur-time"
            type="range"
            min="0"
            max="10"
            defaultValue="0"
            step="0">
          </input>
          <div ref={playTime} className="play-time">00:00</div>
          <button ref={volPlus}
            onClick={function () {
              if (av.current != null) {
                if (av.current.volume < 1) {
                  av.current.volume += 0.1;
                }
              }
            }}
            className="buttonClear vol-button vol-plus">
            +
          </button>
          <button ref={volMinus}
            onClick={function () {
              if (av.current != null) {
                if (av.current.volume > 0.1) {
                  av.current.volume -= 0.1;
                }
              }
            }}
            className="buttonClear vol-button vol-minus">
            -
          </button>
          <audio ref={av}
            onLoadedMetadata={function () {
              if (curTime.current != null && av.current != null) {
                curTime.current.max = av.current.duration.toString();
              }
            }}
            onTimeUpdate={function () {
              if (av.current != null && playTime.current != null && audioVisible.current != null && curTime.current != null) {
                var sec_num = av.current.currentTime;
                var hours: number | string = Math.floor(sec_num / 3600);
                var minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds: number | string = sec_num - (hours * 3600) - (minutes * 60);
                seconds = Math.round(seconds);
                if (hours < 10) {
                  hours = "0" + hours;
                }
                if (minutes < 10) {
                  minutes = "0" + minutes;
                }
                if (seconds < 10) { seconds = "0" + seconds; } {
                  playTime.current.innerHTML = minutes + ':' + seconds
                };
                if (audioVisible.current.getAttribute("data-playing") == "true") {
                  curTime.current.value = av.current.currentTime.toString()
                };
              }
            }}
            className="hidden audio" controls>
          </audio>
        </div>
      </Router>
    </>
  );
}

export default App;
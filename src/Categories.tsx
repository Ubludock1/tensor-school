import { useContext, useEffect, useState } from 'react';
import { TheContext, Audio, ErrorContext } from './App';
import Error from './Erorr';
import { Link } from 'react-router-dom';



const Categories = () => {
  const audio = useContext(Audio);
  const er = useContext(ErrorContext);
  const token = useContext(TheContext);
  const [categories, setCategories] = useState([{ id: Number, name: '', icons: [{ url: '' }] }])
  useEffect(() => {
    fetch('https://api.spotify.com/v1/browse/categories', {
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
      setCategories(data.categories.items);
    }).catch(function (error) {
      Error(error, er);
    })
  }, [token]);
  return (
    <div className="main__content">
      <div className="main_playlist">
        <h2 className="main__head">Все остальное</h2>
        <ul className='main__content-list'>
          {categories.map((item) =>
            <li key={item.id.toString()} className='main__content-item-more' style={{ backgroundImage: 'url(' + item.icons[0].url + ')' }}>
              <Link className='main__content-item-more-link' to={{ pathname: "/a:" + item.id }}>
                <h3 className='main__content-head'>{item.name}</h3>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Categories;
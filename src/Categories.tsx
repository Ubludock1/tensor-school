import { useContext} from 'react';
import { TheContext} from './App';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';


const Categories = () => {
  const token = useContext(TheContext);

  let data = useFetch('https://api.spotify.com/v1/browse/categories',token)

  if(data===null){
    return(<div></div>)
  }
  else{
    return (
      <div className="main__content">
        <div className="main_playlist">
          <h2 className="main__head">Все остальное</h2>
          <ul className='main__content-list'>
            {data.categories?.items.map((item) =>
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
}

export default Categories;
import React from 'react';
import { Link } from 'react-router-dom';



const Categories  = (props:any) =>{

    return (
        <div>
            <ul className='main__content-list'>
            {props.options.map((item:any,id:any)=>
                <li value={item.value} key={item.id} className='main__content-item-more' style={{backgroundImage:'url(' + item.icons[0].url + ')'}}>
                <Link className='main__content-item-more-link'  to={{pathname: "/a:"+item.id}}>
                <h3 className='main__content-head'>{item.name}</h3>
                </Link>
            </li>
            )}
            </ul>
        </div>
    )
}

export default Categories;
import {getToken} from "./getToken.js";
import{Error} from "./Erorr.js"

fetch('https://api.spotify.com/v1/browse/categories',{
    headers:{
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer '+ await getToken()
    }
}).then((res)=>{
    if(!res.ok){
        return Promise.reject(res.status);
    }
    else{
        return res.json()
    }
}).then((data)=>{
    data.categories.items.forEach(element => {
        const main_content_list = document.querySelector(".main__content-list");
        const new_li = document.createElement("li");
        const new_a = document.createElement("a");
        const new_h2 = document.createElement("h2");
        new_li.classList.add("main__content-item-more");
        const url = element.icons[0].url;
        new_li.style.backgroundImage= "url("+''+url+''+")";
        new_a.setAttribute("href","pop.html"+"#"+element.href);
        new_a.classList.add("main__content-item-more-link");
        new_h2.innerHTML = element.name;  
        new_a.appendChild(new_h2);
        new_li.appendChild(new_a);
        main_content_list.appendChild(new_li);
    });
}).catch(function(error){
    Error(error);
})
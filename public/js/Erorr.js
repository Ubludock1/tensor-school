function Error (error){
    switch(error){
        case 403:
            document.querySelector(".error__message").textContent = "Недоступен в этой стране";
            break;
        case 401:
            document.querySelector(".error__message").textContent = "Ошибка сервера";
            break;
    }
    document.querySelector(".error__container").classList.add("display__flex");
}

export {Error};
function Error(error: String, er: React.RefObject<HTMLDivElement>) {
    switch (error) {
        case "403":
            if (er.current != null && er.current.children != null) {
                er.current.children[1].textContent = "Недоступен в этой стране";
                er.current.classList.toggle("display__flex");
            }
            break;
        case "401":
            if (er.current != null && er.current.children != null) {
                er.current.children[1].textContent = "Ошибка сервера";
                er.current.classList.toggle("display__flex");
            }
            break;
        default:
            if (er.current != null && er.current.children != null) {
                er.current.children[1].textContent = "Ошибка сервера";
                er.current.classList.toggle("display__flex");
            }
            break;
    }
}

export default Error;
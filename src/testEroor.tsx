import { useParams } from "react-router-dom";

const  TestError = () => {
    let { status } = useParams<{ status: string }>();
    let message = "";
    switch (status?.slice(1)) {
        case "403":
            message ="Недоступен в этой стране"
            break;
        case "401":
            message = "Ошибка сервера"
            break;
        case "track":
            message = "Этот трек нельзя прослушать"
            break;
        default:
            message = "Ошибка сервера"
            break;
    }
    return(
        <div  className="error__container">
          <h3 className="error__head">Ошибка!</h3>
          <p className="error__message">{message}</p>
          <button className="error__button buttonClear">
            OK
          </button>
        </div>
    )
}

export default TestError;
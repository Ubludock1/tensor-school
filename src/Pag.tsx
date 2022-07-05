import { useNavigate } from 'react-router-dom';

const Pag = () => {
    const history = useNavigate();
    return (
        <>
            <li key="back" onClick={function () { history(-1) }} className="main__pag-item-container"><button className="main__pag-item left buttonClear"> </button></li>
            <li key="next" onClick={function () { history(1) }} className="main__pag-item-container"><button className="main__pag-item right buttonClear"></button></li>
        </>
    )
}

export default Pag;
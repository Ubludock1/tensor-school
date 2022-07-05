import TypeTrack from "./TypeTrack";
import MyType from './Type';
interface AudioType {
    src:MyType;
    setSrc:React.Dispatch<React.SetStateAction<MyType>>;
}

export default AudioType;
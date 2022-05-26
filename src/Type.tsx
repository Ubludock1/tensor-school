import TypeTrack from "./TypeTrack";
interface MyType {
    albums:MyType[];
    categories:{items:MyType[]}
    error:string;
    release_date:string;
    id:number;
    album:{
        id:number;
        images:{url:string}[];
    };
    added_at:string;
    track: MyType;
    images:{url:string}[];
    icons:{url:string}[];
    tracks:{items:MyType[]};
    name: string; 
    preview_url: string; 
    artists: { name: string; }[]; 
    duration_ms: number; 
    img:string;
    data:string;
}

export default MyType;
interface TypeTrack {
    id:number;
    duration_ms: number; 
    album: { name: string };
    preview_url: string;
    name: string;
    artists: { name: string }[];
}

export default TypeTrack;
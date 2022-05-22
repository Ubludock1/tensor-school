import React from 'react';

const Svg = (props:any) =>{
    switch (props.id){
        case 'search':
            return(
                <svg className="header__svg" width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" ><rect id="Icons" x="-640" y="-128" width="1280" height="800" /><g id="Icons1"><g id="Strike"></g><g id="H1"></g><g id="H2"></g><g id="H3"></g><g id="list-ul"></g><g id="hamburger-1"></g><g id="hamburger-2"></g><g id="list-ol"></g><g id="list-task"></g><g id="trash"></g><g id="vertical-menu"></g><g id="horizontal-menu"></g><g id="sidebar-2"></g><g id="Pen"></g><g id="Pen1" ></g><g id="clock"></g><g id="external-link"></g><g id="hr"></g><g id="info"></g><g id="warning"></g><g id="plus-circle"></g><g id="minus-circle"></g><g id="vue"></g><g id="cog"></g><g id="logo"></g><g id="eye-slash"></g><g id="eye"></g><g id="toggle-off"></g><g id="shredder"></g><path  d="M39.94,44.142c-3.387,2.507 7.145,-8.263 4.148,-4.169c0.075,-0.006 -0.064,0.221 -0.53,0.79c0,0 8.004,7.95 11.933,11.996c1.364,1.475 -1.097,4.419 -2.769,2.882c-3.558,-3.452 -11.977,-12.031 -11.99,-12.045l-0.792,0.546Z"/><path  d="M28.179,48.162c5.15,-0.05 10.248,-2.183 13.914,-5.806c4.354,-4.303 6.596,-10.669 5.814,-16.747c-1.34,-10.415 -9.902,-17.483 -19.856,-17.483c-7.563,0 -14.913,4.731 -18.137,11.591c-2.468,5.252 -2.473,11.593 0,16.854c3.201,6.812 10.431,11.518 18.008,11.591c0.086,0 0.172,0 0.257,0Zm-0.236,-3.337c-7.691,-0.074 -14.867,-6.022 -16.294,-13.648c-1.006,-5.376 0.893,-11.194 4.849,-15.012c4.618,-4.459 11.877,-5.952 17.913,-3.425c5.4,2.261 9.442,7.511 10.187,13.295c0.638,4.958 -1.141,10.154 -4.637,13.733c-3.067,3.14 -7.368,5.014 -11.803,5.057c-0.072,0 -0.143,0 -0.215,0Z" /><g id="spinner--loading--dots-"></g><g id="react"></g></g></svg>
            )
            break;
        case 'media':
            return(<svg className="header__svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 78.036 78.036"  ><g id="_x37_7_Essential_Icons_40_"><path id="Music" d="M77.318,0.436c-0.5-0.4-1.1-0.5-1.7-0.4l-48,10c-0.9,0.2-1.6,1-1.6,2v40.8c-2.7-3-6.6-4.8-11-4.8c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15v-35.5l44-9.2v24.4c-2.7-3-6.7-4.8-11-4.8c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15v-51C78.018,1.336,77.718,0.736,77.318,0.436z M15.018,73.936c-6.1,0-11-4.9-11-11s4.9-11,11-11s11,4.9,11,11S21.118,73.936,15.018,73.936z M63.018,63.936c-6.1,0-11-4.9-11-11s4.9-11,11-11s11,4.9,11,11S69.118,63.936,63.018,63.936zM74.018,14.336l-44,9.2v-9.9l44-9.2V14.336z"/></g></svg>)
            break;
        case 'plus':
            return(<svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 hDgDGI"><path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>)
            break;
        case 'heart':
            return(<svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-sc-1bi12j5-0 hDgDGI"><path fill="currentColor" d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>)
            break;
        case 'back':
            return(<svg className="main__pag-svg"  id="Layer_1"  version="1.1" viewBox="0 0 128 128" width="128px"  xmlns="http://www.w3.org/2000/svg" ><g><line  x1="40.5" x2="87.5" y1="17" y2="64"/><line  x1="87.5" x2="40.5" y1="64" y2="111"/></g></svg>)
        default:
            return (<svg></svg>)
            break;
    }
}

export default Svg;
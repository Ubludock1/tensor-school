var client_id = '7b8513be5c214d578cc12c924900f46e'; // Your client id
var client_secret = '3400d157503c41b0a67fa2e04ef5bbfd'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

const getToken = async () => {
    if(window.localStorage.getItem("token")!=null){
        return window.localStorage.token;
    }
    else{
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
            return data.access_token;
        }
};

export {getToken,client_id,client_secret,redirect_uri};
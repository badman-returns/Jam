import React, { useEffect, useState } from 'react';
import { getTokenFromResponse } from '../services/spotifyApiService';
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyAPIService = new SpotifyWebApi();

function useLogin() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        let hash = getTokenFromResponse();
        let token = hash.access_token;
        window.location.hash = "";

        if (token) {
            spotifyAPIService.setAccessToken(token);
            setAuthenticated(true);
            localStorage.setItem('access-token', token);

            spotifyAPIService.getMe().then((response) => {
                console.info(response);
            });

            spotifyAPIService.getUserPlaylists().then((response) => {
                console.info(response);
            })
        }

    }, []);

    return [
        authenticated,
    ]

}

export { useLogin };
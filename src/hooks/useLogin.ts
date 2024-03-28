import React, { useEffect, useState } from 'react';
import { SpotifyAPIService } from '../services/spotifyApiService';
import SpotifyWebApi from 'spotify-web-api-node'
import { useDispatch } from 'react-redux';
import { storeUserData } from '../store/slices/user';

const spotifyAPIService = new SpotifyAPIService();

function useLogin() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        let token;
        const accessToken = localStorage.getItem('access-token');
        if (accessToken) {
            token = accessToken;
            setAuthenticated(true);
        } else {
            let hash = spotifyAPIService.getTokenFromResponse();
            token = hash.access_token;
            window.location.hash = "";
        }
        if (token) {
            spotifyAPIService.setSpotifyAccessToken(token);
            setAuthenticated(true);
            localStorage.setItem('access-token', token);

            spotifyAPIService.getUser().then((response) => {
                dispatch(storeUserData(response));
            });
        }
    }, []);

    return [
        authenticated,
    ]

}

export { useLogin };
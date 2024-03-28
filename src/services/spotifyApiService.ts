import SpotifyWebApi from "spotify-web-api-node";
import { IUser } from "../interfaces/user";

const SpotifyWebAPI = new SpotifyWebApi();

const scopes: string[] = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-modify-public",
    "user-library-read",
    "user-library-modify",
    "streaming"
];

export const authURL: string = `https://accounts.spotify.com/authorize?client_id=4c00db824d334057b7acdb4d9d10addd&redirect_uri=http://localhost:3000&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

function mapSpotifyResponseToUser(response: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return {
        country: response.country,
        display_name: response.display_name ?? '',
        email: response.email ?? '',
        explicit_content: {
            filter_enabled: false,
            filter_locked: false,
        },
        external_urls: response.external_urls,
        followers: response.followers ? { href: response.followers.href ?? '', total: response.followers.total ?? 0 } : { href: '', total: 0 },
        href: response.href,
        id: response.id,
        images: response.images ? response.images.map(image => ({ url: image.url, height: image.height ?? 0, width: image.width ?? 0 })) : [],
        product: response.product,
        type: 'user',
        uri: response.uri,
    };
}

export class SpotifyAPIService {
    constructor() {

    }

    public getTokenFromResponse(): Record<string, string> {
        return window.location.hash
            .substring(1)
            .split("&")
            .reduce<Record<string, string>>((initial, item) => {
                const parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
                return initial;
            }, {});
    }

    public setSpotifyAccessToken(token: string) {
        SpotifyWebAPI.setAccessToken(token);
    }

    public async getUserPlaylists() {
        const response = await SpotifyWebAPI.getUserPlaylists();
        return response.body;
    }

    public async getUser() {
        const response = await SpotifyWebAPI.getMe();
        const userData = mapSpotifyResponseToUser(response.body);
        return userData;
    }
}

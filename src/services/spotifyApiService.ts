

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

export function getTokenFromResponse(): Record<string, string> {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce<Record<string, string>>((initial, item) => {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
}

export const authURL: string = `https://accounts.spotify.com/authorize?client_id=4c00db824d334057b7acdb4d9d10addd&redirect_uri=http://localhost:3000&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

let token;
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
const client_id = "d2f5e85c04bd4123a41040b93c768b2e";
const redirect_uri = "http://localhost:3000/";
const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expireInMatch) {
      token = tokenMatch[1];
      const expiresIn = Number(expireInMatch[1]);
      window.setTimeout(() => (token = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return token;
    } else {
      let state = generateString(16);

      localStorage.setItem("spotify_auth_state", state);
      let scope = "user-read-private user-read-email user-top-read";
      let url = "https://accounts.spotify.com/authorize";
      url += "?response_type=token";
      url += "&client_id=" + encodeURIComponent(client_id);
      url += "&scope=" + encodeURIComponent(scope);
      url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
      url += "&state=" + encodeURIComponent(state);
      window.location = url;
    }
  },
  search(term) {
    console.log(term);
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  savePlaylist(playlists, uri) {
    if (playlists != null && uri != null) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const url = `https://api.spotify.com/v1/me/`;
    let userId;
    const headers = { Authorization: "Bearer " + accessToken };
    return fetch(url, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ name: playlists }),
        });
      })
      .then((response) => response.json())
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ uris: uri }),
          }
        );
      });
  },
};

module.exports = Spotify;

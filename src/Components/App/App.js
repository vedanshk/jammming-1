import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import { useEffect, useState } from "react";
import Spotify from "../../util/Spotify";
import "./App.css";
Spotify.getAccessToken();
function App() {

  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("Favorite Song");

  const [searchResults, setSearchResults] = useState([]);
  const addTrack = (track) => {
    if (playlist.find((trac) => trac.id === track.id)) {
      alert("Track already exists");
      return;
    } else {
      setPlaylist((prevPlaylist) => {
        return [...prevPlaylist, track];
      });
    }
  };

  const removeTrack = (track) => {
    const newPlaylist = playlist.filter((trac) => trac.id !== track.id);
    setPlaylist(newPlaylist);
    
  };
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
   
    const trackUris = playlist.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then((response) => {
      setPlaylistName("New Playlist");
      setPlaylist([]);
  
    });
  };

  const search = (term) => {
    
    Spotify.search(term).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          {/* Add a Playlist componen */}
          <Playlist
            name={playlistName}
            tracks={playlist}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

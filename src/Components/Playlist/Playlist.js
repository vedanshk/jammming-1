import React from "react";
import TrackList from "../TrackList/TrackList";
import './Playlist.css';
function Playlist({onRemove , onNameChange , onSave , tracks }) {

  const handleNameChange = (e) =>{
        const name = e.target.value;
        onNameChange(name);
  }
  return (
    <div className="Playlist">
      <input placeholder="New Playlist" onChange={handleNameChange} />
      {/* <!-- Add a TrackList component -->*/}
      <TrackList onRemove={onRemove} isRemoval={true} tracks={tracks} />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;

import React from "react";
import "./Tracks.css";
function Tracks({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };
  return (
    <div className="Track">
       
        <div className="Track-information">
          <h3>{/* Track name will go here */ track.name} </h3>
          <p>
            {/*trak artist will go here  */ track.artist} | {track.album}
          </p>
        </div>
      
     {!isRemoval && <button className="Track-action" onClick={addTrack}>
        +
      </button>}
      {isRemoval && (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      )}
    </div>
  );
}

export default Tracks;

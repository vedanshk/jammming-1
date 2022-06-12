import React from 'react'
import Tracks from '../Track/Tracks'
import './TrackList.css'
function TrackList(props) {
  const {tracks , onAdd , isRemoval , onRemove} = props;
  return (
    <div className='TrackList'>

        TrackList
        {/* You will add a map  method that redners a st of track components */}

        {tracks.length !== 0 && tracks.map(track => <Tracks key={track.id} track={track} onAdd={onAdd} isRemoval={isRemoval} onRemove={onRemove}/>)}
        </div>
  )
}

export default TrackList
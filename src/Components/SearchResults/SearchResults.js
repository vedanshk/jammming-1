import React from 'react'
import './SearchResults.css'
import TrackList from '../TrackList/TrackList'
function SearchResults({ searchResults , onAdd  }) {
  console.log(searchResults)
  return (
    <div className='SearchResults'>
        
        <h2>SearchResults </h2>
        {/* Add a TrackList component */}
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    
    </div>

  )
}

export default SearchResults;
import React from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {

    const [term, setTerm] = React.useState("");

    const search = () =>{

         onSearch(term);
         setTerm("");
    }

    const handleSearchTerm = (e) =>{
        setTerm(e.target.value)
       
    }
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchTerm}/>
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;

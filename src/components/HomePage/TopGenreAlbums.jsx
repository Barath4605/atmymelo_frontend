import React from "react";
import {getAlbumsFromUserTopGenre} from "../../../api/homepageApi.js";
import SuggestedAlbums from "./SuggestedAlbums.jsx";
import "../../App.css";

const TopGenreAlbums = ({ onDataLoaded }) => {
  return (
    <SuggestedAlbums
      fetchAlbums={getAlbumsFromUserTopGenre}
      subtitle="Albums based on your top genre..."
      onDataLoaded={onDataLoaded}
    />
  );
};

export default TopGenreAlbums;

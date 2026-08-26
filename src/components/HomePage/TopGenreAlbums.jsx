import React from "react";
import { getAlbumsFromUserTopGenre } from "../../../api/homepageApi.js";
import SuggestedAlbums from "./SuggestedAlbums.jsx";
import "../../App.css";

// REMOVED TITLE TO GET DYNAMIC TITLE
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

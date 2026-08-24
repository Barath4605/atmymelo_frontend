import React from "react";
import { getRelistenAlbums } from "../../../api/homepageApi.js";
import SuggestedAlbums from "./SuggestedAlbums.jsx";
import { formatDate } from "../../utils/formatDate.js";

const RelistenAlbums = ({ onDataLoaded }) => {
  return (
    <SuggestedAlbums
      fetchAlbums={getRelistenAlbums}
      title="Maybe a re-listen?"
      subtitle="It has been a while since you first listened to these albums..."
      metadata={(album) => `Last Listen ${formatDate(album.updatedAt)}`}
      TITLE_CUSTOM_CLASS=""
      onDataLoaded={onDataLoaded}
    />
  );
};

export default RelistenAlbums;

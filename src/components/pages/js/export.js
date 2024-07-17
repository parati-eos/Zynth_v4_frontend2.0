// ExportButton.js

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faDownload} from '@fortawesome/free-solid-svg-icons';
import "../css/export-share.css"

const ExportButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="export-share-button exportbutton" >
    <FontAwesomeIcon icon={faDownload}/>
  </button>
  );
};  

export default ExportButton;

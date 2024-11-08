// ShareButton.js

import React from 'react'
import '../css/export-share.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
const ShareButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="export-share-button md:max-lg:mb-2">
      <FontAwesomeIcon icon={faShareAlt} />
    </button>
  )
}

export default ShareButton

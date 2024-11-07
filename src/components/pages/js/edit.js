// ExportButton.js

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../css/export-share.css'

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="export-share-button editbutton md:max-lg:mb-2"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  )
}

export default EditButton

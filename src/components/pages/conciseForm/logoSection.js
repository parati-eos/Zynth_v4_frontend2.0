// src/components/LogoSection.js
import React, { useState } from 'react'
import uploadimg from '../../Asset/Frame.png'

const LogoSection = ({ data, handleChange }) => {
  const [imageSrc, setImageSrc] = useState(uploadimg)

  const onFileChange = (event) => {
    handleChange(event)
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageSrc(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="form-section">
      <label htmlFor="logo" className="section-title">
        Logo
      </label>
      <div className="upload">
        <label htmlFor="file" className="drop-container" id="dropcontainer">
          <img src={imageSrc} alt="Upload Icon" />
          <span className="drop-title">
            {imageSrc === uploadimg ? 'Choose File or Drag Here' : 'Logo Added'}
          </span>
          <input
            type="file"
            id="file"
            name="logo"
            className={`${
              imageSrc !== uploadimg ? 'file-uploaded-success' : ''
            }`}
            onChange={onFileChange}
            accept=".jpg, .jpeg, .png"
            required
          />
        </label>
      </div>
    </div>
  )
}

export default LogoSection

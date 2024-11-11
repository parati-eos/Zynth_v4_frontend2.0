import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Share as ShareIcon, SaveAlt as ExportIcon } from '@mui/icons-material'
import '../css/floating-buttons.css'

const FloatingButtons = ({ handleShare, handleExport }) => {
  return (
    <div className="w-[100vw] floating-buttons justify-around md:justify-normal md:w-[5vw] z-50 fixed bottom-[4vw] right-[0] flex flex-row md:flex-col md:bottom-[1.5vw] md:right-[1vw] md:space-y-4">
      <Tooltip title="Share this presentation as a weblink" arrow>
        <IconButton
          id="share-button"
          sx={{
            bgcolor: 'gray.200',
            '&:hover': {
              bgcolor: '#eab308',
            },
            boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.4)',
            height: { xs: '15vw', md: '3.2vw' },
            width: { xs: '15vw', md: '3.2vw' },
          }}
          aria-label="share"
          onClick={handleShare}
        >
          <ShareIcon
            sx={{
              color: '#eab308',
              '&:hover': { color: 'white' },
              height: { xs: '10vw', md: '2.2vw' },
              width: { xs: '10vw', md: '2.2vw' },
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export to Google Slides to edit" arrow>
        <IconButton
          sx={{
            bgcolor: 'gray.200',
            '&:hover': {
              bgcolor: '#eab308',
            },
            boxShadow: '0 0 8px 1px rgba(255, 255, 255, 0.4)',
            height: { xs: '15vw', md: '3.2vw' },
            width: { xs: '15vw', md: '3.2vw' },
          }}
          aria-label="export"
          onClick={handleExport}
        >
          <ExportIcon
            id="export-button"
            sx={{
              color: '#eab308',
              '&:hover': { color: 'white' },
              height: { xs: '10vw', md: '2.2vw' },
              width: { xs: '10vw', md: '2.2vw' },
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default FloatingButtons

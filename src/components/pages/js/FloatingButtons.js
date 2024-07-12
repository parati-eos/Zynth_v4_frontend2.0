// File: FloatingButtons.js
import React from "react";
import { IconButton } from "@mui/material";
import { Share as ShareIcon, SaveAlt as ExportIcon } from "@mui/icons-material";

const FloatingButtons = ({ handleShare, handleExport }) => {
  const handleClick = (action) => {
    console.log(`Button clicked: ${action}`);
  };
// adarsh
  return (
    <div className="z-50 fixed bottom-[3vw] right-[1.5vw] flex flex-col space-y-6">
      <IconButton
        sx={{
          bgcolor: "gray.200",
          "&:hover": {
            bgcolor: "#eab308",
          },
          boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.4)",
          height: "3.2vw",
          width: "3.2vw",
        }}
        aria-label="share"
        onClick={() => handleShare()}
      >
        <ShareIcon
          sx={{
            color: "#eab308",
            "&:hover": { color: "white" },
            height: "2.2vw",
            width: "2.2vw",
          }}
        />
      </IconButton>
      <IconButton
        sx={{
          bgcolor: "gray.200",
          "&:hover": {
            bgcolor: "#eab308",
          },
          boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.4)",
          height: "3.2vw",
          width: "3.2vw",
        }}
        aria-label="export"
        onClick={() => handleExport()}
      >
        <ExportIcon
          sx={{
            color: "#eab308",
            "&:hover": { color: "white" },
            height: "2.2vw",
            width: "2.2vw",
          }}
        />
      </IconButton>
    </div>
  );
};

export default FloatingButtons;

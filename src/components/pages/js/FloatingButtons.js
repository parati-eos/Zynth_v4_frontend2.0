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
    <div className="w-[100vw] justify-around md:justify-normal md:w-[5vw] z-50 fixed bottom-[4vw] right-[0] flex flex-row md:flex-col  md:bottom-[1.5vw] md:right-[1vw] md:space-y-4">
      <IconButton
        sx={{
          bgcolor: "gray.200",
          "&:hover": {
            bgcolor: "#eab308",
          },
          boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.4)",
          height: { xs: "15vw", md: "3.2vw" },
          width: { xs: "15vw", md: "3.2vw" },
        }}
        aria-label="share"
        onClick={() => handleShare()}
      >
        <ShareIcon
          sx={{
            color: "#eab308",
            "&:hover": { color: "white" },
            height: { xs: "10vw", md: "2.2vw" },
            width: { xs: "10vw", md: "2.2vw" },
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
          height: { xs: "15vw", md: "3.2vw" },
          width: { xs: "15vw", md: "3.2vw" },
        }}
        aria-label="export"
        onClick={() => handleExport()}
      >
        <ExportIcon
          sx={{
            color: "#eab308",
            "&:hover": { color: "white" },
            height: { xs: "10vw", md: "2.2vw" },
            width: { xs: "10vw", md: "2.2vw" },
          }}
        />
      </IconButton>
    </div>
  );
};

export default FloatingButtons;

import React, { useState } from "react";
import uploadFileToS3 from "./uploadFileToS3"; // Import the function to upload files to S3

const WebScreen = ({ handleChange }) => {
  const [webUploadedImageUrl, setWebUploadedImageUrl] = useState([]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const uploadedWebImageUrls = [];

    if (files.length > 3) {
      alert("Maximum 3 files allowed.");
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadFileToS3(file);
        uploadedWebImageUrls.push(imageUrl);
      }

      handleChange({
        target: {
          name: "webScreenshots",
          value: uploadedWebImageUrls,
        },
      });

      setWebUploadedImageUrl(uploadedWebImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="textInputQuestions">
      <label htmlFor="webScreenshots">
        Please upload 3 Web App UI screenshots here -
      </label>
      <input
        type="file"
        id="webScreenshots"
        name="webScreenshots"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <br />
      {webUploadedImageUrl &&
        webUploadedImageUrl.map((url, index) => (
          <div className="uploadedimages" key={index}>
            <ul>
              <li>{url}</li>
            </ul>
          </div>
        ))}
      <br />
    </div>
  );
};

export default WebScreen;

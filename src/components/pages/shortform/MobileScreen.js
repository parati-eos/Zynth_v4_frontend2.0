import React, { useState } from "react";
import uploadFileToS3 from "./uploadFileToS3"; // Import the function to upload files to S3

const MobileScreen = ({ handleChange }) => {
  const [mobileUploadedImageUrl, setMobileUploadedImageUrl] = useState([]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const uploadedMobileImageUrls = [];

    if (files.length > 3) {
      alert("Maximum 3 files allowed.");
      return;
    }

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadFileToS3(file);
        uploadedMobileImageUrls.push(imageUrl);
      }

      handleChange({
        target: {
          name: "mobileScreenshots",
          value: uploadedMobileImageUrls,
        },
      });

      setMobileUploadedImageUrl(uploadedMobileImageUrls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="textInputQuestions">
      <label htmlFor="mobileScreenshots">
        Please upload 3 Mobile App UI screenshots here -
      </label>
      <input
        type="file"
        id="mobileScreenshots"
        name="mobileScreenshots"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <br />
      {mobileUploadedImageUrl &&
        mobileUploadedImageUrl.map((url, index) => (
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

export default MobileScreen;

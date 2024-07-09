
import AWS from 'aws-sdk';

// Set up AWS S3 credentials
const s3 = new AWS.S3({
    accessKeyId: 'AKIA6I7QLJA66W6CYSFW',
    secretAccessKey: '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',
    region: 'us-east-1'
});

// Function to upload a file to S3 bucket
const uploadFileToS3 = async (file) => {
  const fileName = file.name; // Get the original file name
  const uniqueId = Math.floor(Math.random() * 1000); // Generate a unique ID (you can use any method to generate a unique ID)
  const key = `uploads/${uniqueId}_${fileName}`; // Set the key with a prefix 'uploads/' followed by a unique ID and the original file name
  const params = {
    Bucket: 'pitchimage',
    Key: key, // Set the key (path) of the file in the bucket
    Body: file // Set the file data
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
    return data.Location; // Return the public URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadFileToS3;

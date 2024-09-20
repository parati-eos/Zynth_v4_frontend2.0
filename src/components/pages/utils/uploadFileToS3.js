
import AWS from 'aws-sdk';

// Set up AWS S3 credentials
const s3 = new AWS.S3({
    accessKeyId: 'AKIA42PHHRZGAB2RLOU5',
    secretAccessKey: '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',
    region: 'us-east-1'
});

// Function to upload a file to S3 bucket
const uploadFileToS3 = async (file) => {
  const fileName = file.name; // Get the original file name
  const uniqueId = Math.floor(Math.random() * 1000); // Generate a unique ID (you can use any method to generate a unique ID)
  const key = `uploads/${uniqueId}_${fileName}`; // Set the key with a prefix 'uploads/' followed by a unique ID and the original file name
  const params = {
    Bucket: 'zynthimage',
    Key: key, // Set the key (path) of the file in the bucket
    Body: file // Set the file data
  };

  try {
    const data = await s3.upload(params).promise();
    // console.log('File uploaded successfully:', data.Location);
    return data.Location; // Return the public URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default uploadFileToS3;

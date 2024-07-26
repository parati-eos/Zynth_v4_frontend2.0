import axios from 'axios';

const removeBackground = async (file) => {
  try {
    // Create a canvas element to analyze the image
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Load the image into the canvas
    const image = new Image();
    image.src = URL.createObjectURL(file);
    await new Promise((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = (error) => reject(error);
    });

    // Set the canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image onto the canvas
    context.drawImage(image, 0, 0);

    // Analyze the image pixels to check for predominant white background
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let whitePixelCount = 0;
    let totalPixelCount = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      // Increment the total pixel count
      totalPixelCount++;

      // Check if the pixel is white (assuming it's white if RGB values are close to 255)
      if (pixels[i] > 200 && pixels[i + 1] > 200 && pixels[i + 2] > 200) {
        whitePixelCount++;
      }
    }

    // Calculate the percentage of white pixels
    const whitePercentage = whitePixelCount / totalPixelCount;

    console.log('Total Pixels:', totalPixelCount);
    console.log('White Pixels:', whitePixelCount);
    console.log('White Percentage:', whitePercentage);

    // If more than 50% of the image is white, remove the background using remove.bg API
    if (whitePercentage > 0.5) {
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');

      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'Y9P3jWDokVTmx2WYveRFhDz8', // replace with your actual Remove.bg API key
        },
        responseType: 'blob',
      });

      console.log('Background removal response:', response);

      // Ensure the blob type is set to 'image/png'
      const blob = new Blob([response.data], { type: 'image/png' });
      return new File([blob], file.name.replace(/\.[^/.]+$/, ".png"), { type: 'image/png' }); // Ensure the filename ends with .png
    }

    // If less than or equal to 50% of the image is white, return the original file
    return file;
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export default removeBackground;

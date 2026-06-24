// Import the file system module
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'vfs_images.js');

// Create an empty object to store images
const images = {};

// Loop through all files in the images folder
fs.readdirSync(imagesDir).forEach(file => {
  // Check if the file is an image file (all common formats)
  if (file.match(/\.(png|jpg|jpeg|gif|webp|svg|bmp|tiff|tif|ico)$/i)) {

    // Read the image file
    const filePath = path.join(imagesDir, file);
    const buffer = fs.readFileSync(filePath);

    // Convert the file to base64 (so it can be stored as text)
    const base64 = buffer.toString('base64');

    // Get the file extension to identify the image type
    const ext = path.extname(file).toLowerCase().slice(1);

    // Get the image name (filename without extension)
    const imageName = path.parse(file).name;

    // Store it with filename as key (pdfMake format)
    images[imageName + '.' + ext] = base64;

    console.log(`✓ Added image: ${imageName} (${ext.toUpperCase()})`);
  }
});

// Create the output file
const output = `export const vfsImages = ${JSON.stringify(images, null, 2)};`;
fs.writeFileSync(outputFile, output);

console.log(`\n✅ Done! Created ${outputFile}`);
console.log(`Total images: ${Object.keys(images).length}`);

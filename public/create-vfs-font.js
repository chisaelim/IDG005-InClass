// Import the file system module
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const fontsDir = path.join(__dirname, 'fonts');
const outputFile = path.join(__dirname, 'vfs_fonts.js');

// Create an empty object to store fonts
const fonts = {};

// Loop through all files in the fonts folder
fs.readdirSync(fontsDir).forEach(file => {
    // Check if the file is a font file (.ttf, .otf, .woff, .woff2, .eot)
    if (file.match(/\.(ttf|otf|woff|woff2|eot)$/i)) {

        // Read the font file
        const filePath = path.join(fontsDir, file);
        const buffer = fs.readFileSync(filePath);

        // Convert the file to base64 (so it can be stored as text)
        const base64 = buffer.toString('base64');

        // Get the font name (filename without extension)
        const fontName = path.parse(file).name;

        // Get file extension to determine font type
        const ext = path.extname(file).toLowerCase().slice(1);

        // Store it with filename as key (pdfMake format)
        fonts[fontName + '.' + ext] = base64;

        console.log(`✓ Added font: ${fontName}`);
    }
});

// Create the output file
const output = `export const vfsFonts = ${JSON.stringify(fonts, null, 2)};`;
fs.writeFileSync(outputFile, output);

console.log(`\n✅ Done! Created ${outputFile}`);
console.log(`Total fonts: ${Object.keys(fonts).length}`)
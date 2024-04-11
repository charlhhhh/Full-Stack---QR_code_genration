/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


// const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

// Function to prompt user for URL
async function promptForURL() {
  const inquirer = await import('inquirer');
  const questions = [
    {
      type: 'input',
      name: 'url',
      message: 'Enter the URL to generate a QR code for:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a URL.';
        }
      },
    },
  ];

  const answers = await inquirer.default.prompt(questions);
  return answers.url;
}

// Function to generate QR code
function generateQRCode(url) {
  const qrImage = qr.image(url, { type: 'png' });
  const outputFileName = 'qr_img.png';

  qrImage.pipe(require('fs').createWriteStream(outputFileName));
  console.log(`QR Code generated: ${outputFileName}`);
}

// Function to save URL to a txt file
function saveURLToFile(url) {
  const fileName = 'URL.txt';
  fs.writeFile(fileName, url, (err) => {
    if (err) throw err;
    console.log(`URL saved to ${fileName}`);
  });
}

async function main() {
    try {
      const url = await promptForURL();
      generateQRCode(url);
      saveURLToFile(url);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  main();
  




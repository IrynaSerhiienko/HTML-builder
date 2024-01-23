const fs = require('fs/promises');
const path = require('path');

async function readFolderContent() {
  try {
    const dirPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    // console.log("files>>", files);

    console.log('File Name     | File Extension | File Size');
    console.log('--------------|----------------|----------');

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(dirPath, file.name);
        const stats = await fs.stat(filePath);

        const fileSizeInByte = stats.size;
        const fileSize = (fileSizeInByte / 1024).toFixed(3) + 'b';

        const fileName = path.basename(file.name, path.extname(file.name));
        const fileExtension = path.extname(file.name).slice(1);

        const formattedFileName = fileName.padEnd(13);
        const formattedFileExtension = fileExtension.padEnd(14);
        const formattedFileSize = fileSize.padEnd(12);
        console.log(
          `${formattedFileName} | ${formattedFileExtension} | ${formattedFileSize}`,
        );
      }
    }
  } catch (error) {
    console.error('Error reading folder contents', error.message);
  }
}
readFolderContent();

// const fs = require('fs');
// const path = require('path');

// const dirPath = path.join(__dirname, 'secret-folder');
// fs.readdir(dirPath, (err, data) => {
//   console.log('File Name     | File Extension | File Size');
//   console.log('--------------|----------------|----------');

//   data.forEach((file) => {
//     const filePath = path.join(dirPath, file);
//     const fileSizeInByte = fs.statSync(filePath).size;
//     const fileSize = (fileSizeInByte / 1024).toFixed(3) + 'b';

//     const fileName = path.basename(file, path.extname(file));
//     const fileExtension = path.extname(file).slice(1);

//     const formattedFileName = fileName.padEnd(13);
//     const formattedFileExtension = fileExtension.padEnd(14);
//     const formattedFileSize = fileSize.padEnd(12);
//     console.log(
//       `${formattedFileName} | ${formattedFileExtension} | ${formattedFileSize}`,
//     );
//   });
// });

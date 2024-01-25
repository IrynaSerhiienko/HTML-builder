const fs = require('fs/promises');
const path = require('path');

async function joinFiles() {
  try {
    const dirStylesPath = path.join(__dirname, 'styles');
    const dirProjectDistPath = path.join(__dirname, 'project-dist');
    const fileBundlePath = path.join(dirProjectDistPath, 'bundle.css');

    const files = await fs.readdir(dirStylesPath, { withFileTypes: true });
    const bundleContent = [];

    for (const file of files) {
      if (file.isFile()) {
        const fileExtention = path.extname(file.name).slice(1);
        if (fileExtention === 'css') {
          const filePath = path.join(dirStylesPath, file.name);
          const fileContent = await fs.readFile(filePath, 'utf-8');
          bundleContent.push(fileContent);
        }
      }
    }
    await fs.writeFile(fileBundlePath, bundleContent.join('\n'));
    console.log('bundle.css file created/updated successfully!');
  } catch (err) {
    console.log('Error joining files', err.message);
  }
}

joinFiles();

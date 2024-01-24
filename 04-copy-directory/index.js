const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  try {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files-copy');

    const targetDirExists = await directoryExists(targetDir);

    if (!targetDirExists) {
      await fs.mkdir(targetDir, { recursive: true });
      console.log('Directory "files-copy" created successfully!\n');
    }

    const files = await fs.readdir(sourceDir);

    await removeExtraFiles(targetDir, sourceDir, files);
    // await removeExtraFiles(targetDir, sourceDir, files);

    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);

      try {
        const sourceStats = await fs.stat(sourceFilePath);
        const targetStats = await fs.stat(targetFilePath);
        if (sourceStats.mtime > targetStats.mtime) {
          const fileContent = await fs.readFile(sourceFilePath);
          await fs.writeFile(targetFilePath, fileContent);
          console.log(`File ${file} copied successfully!`);
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          const fileContent = await fs.readFile(sourceFilePath);
          await fs.writeFile(targetFilePath, fileContent);
          console.log(`File ${file} copied successfully!`);
        } else {
          throw err;
        }
      }
    }
    // console.log('All files copied successfully!');
  } catch (error) {
    console.error('Error creating folder', error.message);
  }
}

async function removeExtraFiles(targetDir, sourceDir, filesInSourceDir) {
  const fileInCopyFolder = await fs.readdir(targetDir);
  for (const file of fileInCopyFolder) {
    if (!filesInSourceDir.includes(file)) {
      const filePathToRemove = path.join(targetDir, file);
      await fs.unlink(filePathToRemove);
      console.log(`File ${file} removed from "file-copy folder!"`);
    }
  }
}

async function directoryExists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch (error) {
    return false;
  }
}

copyDir();

const FileLibs = require('../libs/files-libs');

function listFiles(folderPath) {
    try {
        FileLibs.getFileListFromAFolder(folderPath)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

function getLargestNVMEDrive() {
    try {
        FileLibs.getLargestNVMEDrive()
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = { listFiles,getLargestNVMEDrive }
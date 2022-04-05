const fs = require('fs');
const si = require('systeminformation');

function getFiles(dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            // getFiles(name, files_);
        } else {
            // console.log(fs.statSync(name));
            files_.push({
                name: files[i],
                path: name,
                size: fs.statSync(name) && formatBytes(fs.statSync(name).size)
            });
        }
    }
    return files_;
}


function formatBytes(bytes, decimals = 3) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



// console.log(getFiles('path/to/dir'))


async function getFileListFromAFolder(folderPath, fileExtension = '*') {
    try {
        if (fs.lstatSync(folderPath).isDirectory()) {
            var files = getFiles(folderPath);
            console.log(JSON.stringify(files, null, 4));
        } else {
            throw new Error(`This location ${folderPath} is not a valid directory location`)
        }
    } catch (error) {
        throw error;
    }
}

function getMaxOfJson(jsonalreadyparsed, property) {
    var max = null;
    var maxElement = {};
    for (var i = 0; i < jsonalreadyparsed.length; i++) {

        if (max == null) {

            max = jsonalreadyparsed[i][property];
            maxElement = jsonalreadyparsed[i];
        } else {

            if (parseFloat(jsonalreadyparsed[i][property]) > max) {

                max = jsonalreadyparsed[i][property];
                maxElement = jsonalreadyparsed[i];

            }

        }

    }
    return maxElement;
}

async function getLargestNVMEDrive() {
    try {
        var response = await si.diskLayout();
        response = response.filter((item, index) => {
            return item.type === 'NVMe';
        })
        response = getMaxOfJson(response, 'size')
        console.log(JSON.stringify(response, null, 4));
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getFileListFromAFolder,
    getLargestNVMEDrive
}
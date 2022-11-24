
const fileInput = document.querySelector('#file');
const fileList = document.querySelector('#file-list');

fileInput.addEventListener('change', updateFileList);

function updateFileList() {
 while(fileList.firstChild) {
    fileList.removeChild(fileList.firstChild);
}

let curFiles = fileInput.files;

// let storageFiles= localStorage.setItem("curFiles",curFiles)




if(!(curFiles.length === 0))  {
//  console.log('test');

    for(let i = 0; i < curFiles.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = 'File name: ' + curFiles[i].name + '; file size ' + returnFileSize(curFiles[i].size) + '.';
        fileList.appendChild(listItem);
        }
    }
  }

  function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
 }
}

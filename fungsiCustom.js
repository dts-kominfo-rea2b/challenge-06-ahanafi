// TODO: import module bila dibutuhkan di sini
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

const getMessage = (data) => {
  const parsedData = JSON.parse(data);

  if(parsedData?.message) {
    return parsedData?.message.split(' ')[1];
  }

  if(parsedData?.length > 0) {
    const arrMessage = parsedData.map(item => {
      if(item?.message) return item?.message;
      if(item?.data?.message) return item?.data?.message;
    });
    return arrMessage[arrMessage.length - 1].split(' ')[1]
  }
}

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3
const bacaData = (fnCallback) => {
  const files = [file1, file2, file3];

  const results = files.map(file => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf-8", (err, data) => {
        if(err) return reject(err);
        const message = getMessage(data);
        resolve(message);
      });
    })
  });

  // Proccess result in Callback
  Promise.all(results)
    .then(value => fnCallback(null, value))
    .catch(err => fnCallback(err, null));
};

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};

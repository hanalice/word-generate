const fs = require('fs');
const JSZip = require('jszip');
const xml2js = require('xml2js');

// fs.readFile('loca.docx', (err, data) => {
//   JSZip.loadAsync(data).then((zip) => {
//     zip.file("word/document.xml").async("string").then((xmlContent) => {
//       xml2js.parseString(xmlContent, (err, result) => {
//         console.log(result); // 解析后的XML结构
//       });
//     });
//   });
// });
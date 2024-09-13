
// import extractAndDownloadResources from './scripts/extract-download-resources.js'
const edr = require('./scripts/extract-download-resources.js')
// 示例调用
const docxFilePath = 'loca.docx';  // 替换为你的 .docx 文件路径
const downloadDir = './downloads';    // 资源保存目录

edr(docxFilePath, downloadDir)
    .then(() => console.log('所有资源已下载'))
    .catch((err) => console.error('发生错误:', err));
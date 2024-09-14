/**
 * extract raw taxt from docx
 */
const fs = require('fs');
const mammoth = require('mammoth');

const extractTextFromWord = async () => {
//   const result = await mammoth.extractRawText({ path: "loca.docx" });
//   console.log(result.value); // 提取的文本内容
    const result = await mammoth.convertToHtml({ path: 'loca.docx'});
    console.log(result.value);
};

extractTextFromWord();
/**
 * extract raw taxt from docx
 */
const mammoth = require('mammoth');

module.exports = extractTextFromWord = async (path) => {
  const result = await mammoth.extractRawText({ path, });
  return result.value; // 提取的文本内容
};
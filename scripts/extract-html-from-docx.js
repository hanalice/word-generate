/**
 * extract raw taxt from docx
 */
const mammoth = require('mammoth');

module.exports = extractHtmlFromWord = async (path) => {
    const result = await mammoth.convertToHtml({ path, });
    return result.value;
};
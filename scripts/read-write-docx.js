const fs = require('fs-extra');
const { Document, Packer, Paragraph } = require('docx');
const extractTextFromDocx = require('./extract-text-from-docx.js');


// two main improvements about this code, trycatch and return promise.
module.exports = async function readAWriteDocx(path, targetFolder, outputFileName = 'output_with_read.docx') {

    // 读取 .docx 文件
    try {
        const data = await extractTextFromDocx(path);
        const doc = new Document({
            sections: [],
        });
        
        // 3. 创建一个段落，并将读出的内容插入其中
        const paragraph = new Paragraph({
            text: data,
        });
        
        // 4. 添加段落到文档
        doc.addSection({
            children: [paragraph],
        });
    
    
        // 5. 将文档打包并写入到 .docx 文件中
        /**
         * In JavaScript, an async function is expected to return a Promise. Other code that calls this function can then use await to pause execution until the Promise resolves, or use .then() to schedule code to run after the Promise resolves.
         * In your function readAWriteDocx, the Packer.toBuffer(doc).then(...) operation is asynchronous, but the function does not wait for it to complete before returning. This means if you were to use await readAWriteDocx(...), the function would return immediately, not when the .docx file has been written.
         * This could lead to unexpected behavior. For example, if you tried to read the .docx file immediately after calling readAWriteDocx, the file might not exist yet, because readAWriteDocx did not wait for the file writing to complete before returning.
         * To fix this, you can return the Promise from Packer.toBuffer(doc).then(...), or better yet, use await to wait for the Promise to resolve, and then return the result. This way, readAWriteDocx will return a Promise that resolves when the .docx file has been written, and other code can reliably use await or .then() to wait for this operation to complete.
         */
        // bad implementation
        // Packer.toBuffer(doc).then((buffer) => {
        //     try {
        //         const output = `${targetFolder}/output_with_read.docx`;
        //         fs.writeFileSync(output, buffer);
        //         console.log('DOCX file created successfully');
        //     } catch (error) {
        //         console.error('Error writing file:', error);
        //     }
        // });
        
        // good implementation
        const buffer = await Packer.toBuffer(doc);
        const output = `${targetFolder}/${outputFileName}`;
        fs.writeFileSync(output, buffer);
        console.log(`DOCX file created successfully in ${output}`);
        return output;
    } catch (error) {
        console.log('Error reading DOCX file:', error);
        throw error;
    }
}







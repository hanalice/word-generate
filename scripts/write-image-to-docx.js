const fs = require('fs');
const { Document, Packer, Paragraph, ImageRun } = require('docx');

// 1. 读取图片文件
const imagePath = 'downloads/d3062709103cd641f4e4d6675fe6887doutput_00004.jpg'; // 图片的路径
const imageBuffer = fs.readFileSync(imagePath);

// 2. 创建一个新的 docx 文档
// 注意: sections 空数组必须存在，否则会创建报错`for (const section of options2.sections) { TypeError: options2.sections is not iterable`
const doc = new Document({
    // creator: "Your Name",   // 显式设置 creator
    // title: "Sample Document",
    // description: "A document with an image",
    sections: [
        // {
        //     properties: {}, // 章节属性（可选）
        //     children: [
        //         new Paragraph({
        //             text: "This is the first paragraph",
        //         }),
        //     ],
        // },
    ],
});

// 3. 创建一个段落，并将图片插入其中
const image = new ImageRun({
    data: imageBuffer,         // 图片的二进制数据
    transformation: {
        width: 200,            // 图片的宽度（单位：像素）
        height: 200,           // 图片的高度（单位：像素）
    },
});

const paragraph = new Paragraph({
    children: [image],          // 将图片作为段落内容
});

// 4. 添加段落到文档
doc.addSection({
    children: [paragraph],
});

// 5. 将文档打包并写入到 .docx 文件中
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('output_with_image.docx', buffer);
    console.log('DOCX file with image created successfully');
});

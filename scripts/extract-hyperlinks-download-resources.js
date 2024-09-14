const JSZip = require('jszip');
const fs = require('fs-extra');
const xml2js = require('xml2js');
const axios = require('axios');
const path = require('path');

module.exports = async function extractAndDownloadResources(docxFilePath, downloadDir) {
    // 确保下载目录存在
    await fs.ensureDir(downloadDir);

    // 读取 .docx 文件
    const data = await fs.readFile(docxFilePath);

    // 解压 .docx 文件
    const zip = await JSZip.loadAsync(data);

    // 解析 document.xml 文件（包含超链接引用）
    const documentXml = await zip.file("word/document.xml").async("string");
    const parser = new xml2js.Parser();
    const documentJson = await parser.parseStringPromise(documentXml);

    // 解析 .rels 文件（包含超链接和外部资源的真实 URL）
    const relsXml = await zip.file("word/_rels/document.xml.rels").async("string");
    const relsJson = await parser.parseStringPromise(relsXml);

    const relationships = relsJson.Relationships.Relationship;
    console.log('1documentJson:', documentJson['w:document']['w:body'][0]['w:p'])
    const wps = documentJson['w:document']['w:body'][0]['w:p'];

    // 遍历 document.xml 中的超链接
    const hyperlinks = [];
    wps.forEach((wp) => {
        const links = wp['w:hyperlink'];
        links?.forEach((link) => {
            const rId = link['$']['r:id'];
            const text = link['w:r'][0]['w:t'][0]; // 获取链接文本

            // 查找关联的 URL
            const relationship = relationships.find((rel) => rel['$']['Id'] === rId);
            if (relationship && relationship['$']['TargetMode'] === 'External') {
                hyperlinks.push({
                    text: text,
                    url: relationship['$']['Target']
                });
            }
        })
    });

    console.log('2找到以下超链接:', hyperlinks);

    // 下载外部资源
    for (let link of hyperlinks) {
        const fileName = path.basename(link.url);
        const filePath = path.join(downloadDir, fileName);

        try {
            const response = await axios({
                url: link.url,
                method: 'GET',
                responseType: 'stream'
            });

            // 将下载的文件保存到本地
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            console.log(`下载成功: ${link.url} -> ${filePath}`);
        } catch (error) {
            console.error(`下载失败: ${link.url}`, error.message);
        }
    }
}
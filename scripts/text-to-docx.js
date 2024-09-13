/**
 * generate docx from plain text
 */
const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun } = docx;

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new TextRun("Hello World from Node.js"),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("example.docx", buffer);
});
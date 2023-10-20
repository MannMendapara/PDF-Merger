const PDFMerger = require('pdf-merger-js');
const merger = new PDFMerger();
const fs = require('fs')
const pdfMerger = async (p1,p2,filename) => {
    await merger.add(p1);
    await merger.add(p2);
    const path = `${filename}.pdf`;
    const status = fs.existsSync(path,filename);
    if(!status){
        await merger.save(`${filename}.pdf`);
    }
}
module.exports = {pdfMerger} 
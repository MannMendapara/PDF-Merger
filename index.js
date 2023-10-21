const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PDFMerger = require("pdf-merger-js");
const fs = require("fs");
const app = express();
const merger = new PDFMerger();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.post("/merge", upload.array("pdfInput", 2), async function (req, res) {
  const file1path = path.join(__dirname, req.files[0].path);
  const file2path = path.join(__dirname, req.files[1].path);
  var filename = `merged_${req.files[0].filename}_${req.files[1].filename}`;
  const pdfMerger = async (p1, p2, filename) => {
    await merger.add(p1);
    await merger.add(p2);
    const path = `${filename}.pdf`;
    const status = fs.existsSync(path, filename);
    if (!status) {
      await merger.save(`${filename}.pdf`);
    }
  };
  await pdfMerger(file1path, file2path, filename);
  res.sendFile(path.join(__dirname, `/${filename}.pdf`));
});
app.listen(3000, () => {
  console.log("Listening at port 3000");
});

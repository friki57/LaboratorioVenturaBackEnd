import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

import fs from "fs"
import path from "path"

// Load the docx file as binary content
const content = fs.readFileSync(
    path.resolve("./src/Utils/example.docx"),
    "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
    description: "New Website",
});

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve("./src/Utils/output.docx"), buf);
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

import fs from "fs"
import path from "path"

export function reporteLaboratorio(datos, callback)
{
    const content = fs.readFileSync(
        path.resolve("./src/Utils/Nombre.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    doc.render(datos);
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve("./src/Utils/output.docx"), buf);
    callback()
}
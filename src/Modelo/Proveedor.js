import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProveedorSchema = new Schema(
    {
        Nombre: String,
        RazonSocial: String,
        NIT: String,
        Direccion: String,
        Telefono: String
    }
)

export default mongoose.model("proveedor", ProveedorSchema);
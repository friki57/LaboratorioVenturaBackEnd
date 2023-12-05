import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductoSchema = new Schema(
    {
        Codigo: String,
        Nombre: String,
        UnidadMedida: String,
        Descripcion: String,
        CodigoBarras: String,
        Ubicacion: String,
        PrecioCompra: String,
        Utilidad: String,
        PrecioVenta: String,
        InventarioMinimo: String,
        InventarioActual: String,
        FechaVencimiento: String,
        Proveedor: String,
        GrupoFamilia: String,
        SubGrupo: String,
        NombreGenerico: String,
        RegistroSanitario: String,
    }
)

export default mongoose.model("productoeliminado", ProductoSchema);
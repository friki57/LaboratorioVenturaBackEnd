import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductoSchema = new Schema(
    {
        Codigo: String,
        CantidadTotal: Number,
        PrecioCompra: Number,
        FechaVencimiento: String,
        Lote: String
    }
)
const InventarioSchema = new Schema(
    {
        Fecha: String,
        MontoTotal: Number,
        Proveedor: String,
        TipoMovimiento: String,
        Motivo: String,
        Detalle: [ProductoSchema],
    }
)

export default mongoose.model("inventarioEliminado", InventarioSchema);
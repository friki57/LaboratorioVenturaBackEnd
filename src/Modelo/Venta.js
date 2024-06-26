import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductoSchema = new Schema(
    {
        _idProducto: String,
        Cantidad: Number,
        PrecioVenta: Number,
        Total: Number,
    }
)
const FacturacionSchema = new Schema(
    {
        RazonSocial: String,
        NIT: String,
        Email: String,
        FormaDePago: String,
    }
)
const VentaSchema = new Schema(
    {
        Fecha: String,
        PrecioTotal: Number,
        Descuento_Ganancia: Number,
        Cliente: String,
        Producto: [ProductoSchema],
        Facturacion: FacturacionSchema,
    }
)

export default mongoose.model("venta", VentaSchema);
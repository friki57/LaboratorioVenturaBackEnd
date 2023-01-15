import crudLaboratorio from "../Cruds/crudLaboratorio.js";

export default (rutas) => {
    rutas.get("/laboratorio/leertodo", async (req, res) => {
        console.log("******************** Leer Todo Laboratorio ********************\n");
        crudLaboratorio.buscarTodo((laboratorios) => {
            res.json(laboratorios)
            console.log("******************** Fin Leer Todo Laboratorio ********************");
        })
    });
    rutas.post("/laboratorio/agregar", async (req, res) => {
        console.log("******************** Agregar Laboratorio ********************\nLlega:\n", req.body);
        res.json({ mensaje: req.body })

/*         crudLaboratorio.guardar(req.body, () => {
            res.json({ mensaje: "Laboratorio Registrado con éxito" })
            console.log("******************** Fin Agregar Laboratorio ********************");
        }) */
    });
}

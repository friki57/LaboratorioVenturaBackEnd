export function filtrarLaboratorios(datos, filtro)
{
    datos = datos.map(lab=>({...lab, Paciente: lab.Paciente._doc? lab.Paciente._doc: lab.Paciente}))
    datos = ordenarLaboratorio(datos, filtro.ord)
    datos = filtrarLaboratorio(datos, filtro);
    // console.log(datos)
    return datos;
}

function filtrarLaboratorio(datos, filtros)
{
    console.log(datos, filtros)
    if (filtros.Estado != "" && filtros.Estado != "Todos") {
        datos = datos.filter(lab => {
            if (lab.Paciente.NombreCompleto != undefined){
                if(filtros.Estado=="Pendiente")
                return lab.ExamenesRealizados.filter(ex=>ex.Estado==filtros.Estado).length>0
                if(filtros.Estado=="Realizado"){
                    let realizados = lab.ExamenesRealizados.filter(ex => ex.Estado != filtros.Estado)
                    return realizados.length==0
                }
            }
        });
    }
    if(filtros.Nombre != ""){
        datos = datos.filter(lab => {
            if (lab.Paciente.NombreCompleto != undefined)
                return lab.Paciente.NombreCompleto.substring(0, filtros.Nombre.length).toLowerCase() == (filtros.Nombre).toLowerCase()
            // return lab.Paciente.NombreCompleto.includes(filtros.Nombre)
        });
    }
    if(filtros.CI != ""){
        datos = datos.filter(lab => {
            if (lab.Paciente.CI != undefined)
                return lab.Paciente.CI.substring(0, filtros.CI.length).toLowerCase() == (filtros.CI).toLowerCase();
        });
    }
    if(filtros.CodigoPaciente != ""){
        datos = datos.filter(lab => {
            if (lab.Paciente.CodigoPaciente != undefined)
                return lab.Paciente.CodigoPaciente.substring(0, filtros.CodigoPaciente.length).toLowerCase() == (filtros.CodigoPaciente).toLowerCase();
        });
    }
    return datos;
}
function ordenarLaboratorio(datos, ord)
{
    switch(ord)
    {
        case "Codigo Ascendente":
            {
                datos = datos.sort((a, b) => a.Paciente.CodigoPaciente - b.Paciente.CodigoPaciente);
                break;
            }
        case "Codigo Descendente":
            {        
                datos = datos.sort((a, b) => b.Paciente.CodigoPaciente - a.Paciente.CodigoPaciente);
                break;
            }
        case "Mas recientes":
            {
                datos = datos.reverse()
                break;
            }
    }
    return datos;
}

export function filtrarPacientes(datos, filtro) {
    datos = ordenarPaciente(datos, filtro.ord)
    datos = filtrarPaciente(datos, filtro);
    // console.log(datos)
    return datos;
}
function filtrarPaciente(datos, filtros)
{
    if(filtros.Nombre != "" && filtros.Nombre !== undefined){
        datos = datos.filter(pac => {
            if (pac.Nombres != undefined)
                return pac.Nombres.substring(0, filtros.Nombre.length).toLowerCase() == (filtros.Nombre).toLowerCase()
        });
    }
    if(filtros.PrimerApellido != "" && filtros.PrimerApellido !== undefined){
        datos = datos.filter(pac => {
            if (pac.PrimerApellido != undefined)
                return pac.PrimerApellido.substring(0, filtros.PrimerApellido.length).toLowerCase() == (filtros.PrimerApellido).toLowerCase()
        });
    }
    if(filtros.SegundoApellido != "" && filtros.SegundoApellido !== undefined){
        datos = datos.filter(pac => {
            if (pac.SegundoApellido != undefined)
                return pac.SegundoApellido.substring(0, filtros.SegundoApellido.length).toLowerCase() == (filtros.SegundoApellido).toLowerCase()
        });
    }
    if(filtros.CI != "" && filtros.CI !== undefined){
        datos = datos.filter(pac => {
            if (pac.CI != undefined)
                return pac.CI.substring(0, filtros.CI.length).toLowerCase() == (filtros.CI).toLowerCase();
        });
    }
    if(filtros.CodigoPaciente != "" && filtros.CodigoPaciente !== undefined){
        datos = datos.filter(lab => {
            if (lab.CodigoPaciente != undefined)
                return lab.CodigoPaciente.substring(0, filtros.CodigoPaciente.length).toLowerCase() == (filtros.CodigoPaciente).toLowerCase();
        });
    }
    return datos;
}
function ordenarPaciente(datos, ord)
{
    switch(ord)
    {
        case "Codigo Ascendente":
            {
                datos = datos.sort((a, b) => a.CodigoPaciente - b.CodigoPaciente);
                break;
            }
        case "Codigo Descendente":
            {        
                datos = datos.sort((a, b) => b.CodigoPaciente - a.CodigoPaciente);
                break;
            }
        case "Edad Ascendente":
            {
                datos = datos.sort((a, b) => a.Edad - b.Edad);
                break;
            }
        case "Edad Descendente":
            {
                datos = datos.sort((a, b) => b.Edad - a.Edad);
                break;
            }
    }
    return datos;
}
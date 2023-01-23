export function filtrarLaboratorios(datos, filtro)
{
    datos = ordenarLaboratorio(datos, filtro.ord)
    datos = filtrarLaboratorio(datos, filtro);
    // console.log(datos)
    return datos;
}

function filtrarLaboratorio(datos, filtros)
{
    if (filtros.Estado != "" && filtros.Estado != "Todos") {
        datos = datos.filter(lab => {
            if (lab.Paciente._doc.NombreCompleto != undefined){
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
            if (lab.Paciente._doc.NombreCompleto != undefined)
                return lab.Paciente._doc.NombreCompleto.substring(0, filtros.Nombre.length).toLowerCase() == (filtros.Nombre).toLowerCase()
            // return lab.Paciente._doc.NombreCompleto.includes(filtros.Nombre)
        });
    }
    if(filtros.CI != ""){
        datos = datos.filter(lab => {
            if (lab.Paciente._doc.CI != undefined)
                return lab.Paciente._doc.CI.substring(0, filtros.CI.length).toLowerCase() == (filtros.CI).toLowerCase();
        });
    }
    if(filtros.CodigoPaciente != ""){
        datos = datos.filter(lab => {
            if (lab.Paciente._doc.CodigoPaciente != undefined)
                return lab.Paciente._doc.CodigoPaciente.substring(0, filtros.CodigoPaciente.length).toLowerCase() == (filtros.CodigoPaciente).toLowerCase();
        });
    }
    return datos;
}
function ordenarLaboratorio(datos, ord)
{
    switch(ord)
    {
        case "Codigo Ascendiente":
            {
                datos = datos.sort((a, b) => a.Paciente.CodigoPaciente - b.Paciente.CodigoPaciente);
                break;
            }
        case "Codigo Descendiente":
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
    if (filtros.Estado != "" && filtros.Estado != "Todos") {
        datos = datos.filter(lab => {
            if (lab.Paciente._doc.NombreCompleto != undefined){
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
        datos = datos.filter(pac => {
            if (pac.Nombres != undefined)
                return pac.Nombres.substring(0, filtros.Nombre.length).toLowerCase() == (filtros.Nombre).toLowerCase()
        });
    }
    if(filtros.CI != ""){
        datos = datos.filter(pac => {
            if (pac.CI != undefined)
                return pac.CI.substring(0, filtros.CI.length).toLowerCase() == (filtros.CI).toLowerCase();
        });
    }
    if(filtros.CodigoPaciente != ""){
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
        case "Codigo Ascendiente":
            {
                datos = datos.sort((a, b) => a.CodigoPaciente - b.CodigoPaciente);
                break;
            }
        case "Codigo Descendiente":
            {        
                datos = datos.sort((a, b) => b.CodigoPaciente - a.CodigoPaciente);
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
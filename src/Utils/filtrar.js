export function filtrarLaboratorios(datos, filtro)
{
    datos = ordenar(datos, filtro.ord)
    datos = filtrar(datos, filtro);
    return datos;
}

function filtrar(datos, filtros)
{
    if(filtros.Nombre != ""){
        datos = datos.filter(lab => {
            console.log(lab.Paciente._doc.NombreCompleto)
            if (lab.Paciente._doc.NombreCompleto != undefined)
                return lab.Paciente._doc.NombreCompleto.includes(filtros.Nombre)
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
function ordenar(datos, ord)
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
export function filtrarLaboratorios(datos, filtro)
{
    datos = ordenar(datos, filtro.ord)
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
const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","]
export function texto(valRef, n = 0) {
    let rang = valRef.split("-")
        .map(a => a.trim());
    if (isNaN(rang[0]))
        return true
    else
        return false
}
export function valRef(valRef, n = 0) {
    let rang = valRef.split("-")
        .map(a => a.trim());
    if (isNaN(rang[0]))
        return guionLet(rang)
    else
        return guionNum(rang, n)
}
export function guionLet(rang)
{
    return rang;
}
export function guionNum(rang, n)
{
    rang = [rang[0], rang[1].split(Array.from(rang[1]).find(a => !num.includes(a)))[0]];
    let min = parseFloat(rang[0])
    let max = parseFloat(rang[1])
    n = parseFloat(n)
    if (n < min) return -1
    if (n > max) return 1
    if (n >= min && n <= max) return 0
}

function enRango(min, max, val){
    return val>=min && val<=max;
}
export function selectValRef(vals, paciente){
    console.log(paciente)
    let selected = vals.find(valRef=>
        {
            // console.log(valRef)
            const ran = enRango(valRef.EdadMinima, valRef.EdadMaxima, paciente.edad)
            if(ran) return valRef;
        }
    )
    selected = selected._doc;
    selected.ValorReferencia = (paciente.Genero == "Masculino" ? selected.ValoresReferenciaHombre : selected.ValoresReferenciaMujer)
    console.log("Sled", selected)
    return selected;    
}
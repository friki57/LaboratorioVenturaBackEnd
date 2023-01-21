const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","]
export function valRef(valRef, n) {
    let ret = valRef.split("-")
        .map(a => a.trim());
    ret = [ret[0], ret[1].split(Array.from(ret[1]).find(a => !num.includes(a)))[0]];
    let min = parseFloat(ret[0])
    let max = parseFloat(ret[1])
    n = parseFloat(n)
    if (n < min) return -1
    if (n > max) return 1
    if (n >= min && n <= max) return 0
}

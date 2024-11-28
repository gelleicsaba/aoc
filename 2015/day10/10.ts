let input = `1113222113`

const calc = (_input: string): string => {
    let cn = ''
    let prev = ''
    let sb = ''
    _input += "_"
    for (let x=0;x<_input.length; ++x) {
        if (x>0) {
            if (_input.charAt(x)==prev) {
                cn += prev
            } else {
                sb += `${cn.length}${cn.charAt(0)}`
                cn = _input.charAt(x)
            }
        } else {
            cn = _input.charAt(0)
        }
        prev = _input.charAt(x)
    }
    return sb
}

let num=input
for (let x=0; x<50; ++x) {
    num = calc(num)
}
console.log(`A: ${num.length}`)

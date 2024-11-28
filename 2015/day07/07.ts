import { input } from "./07data"

/*
const test =
`123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`
*/

let _inputs = input.replaceAll("\r","").split("\n")
//const _inputs = test.replaceAll("\r","").split("\n")

let vars = {}

const isNum = (s: string) => {
    return s.charAt(0)<='9' && s.charAt(0)>='0'
}
const value = (s: string) => {
    if (!isNum(s)) {
        if (vars[s] == undefined) {
            return 0
        }
        const r = parseInt(vars[s])
        return !isNaN(r) ? r : 0
    }
    return parseInt(s)
}
const ok = (s: string) => {
    if (isNum(s)) {
        return true
    }
    return vars[s] == undefined ? false : true
}


const process = (initial: boolean) => {

    if (initial) {
        for (let idx=0; idx < _inputs.length; ++idx) {
            const row = _inputs[idx]
            const tk = row.trim().split(" ")
            if (tk.length == 3 && tk[1] == "->" && isNum(tk[0]) ) {
                vars[tk[2]] = value(tk[0])
                _inputs[idx] = "* * * " + _inputs[idx]
            }
        }
    }

    let complete = true

    for (let idx=0; idx < _inputs.length; ++idx) {
        const row = _inputs[idx]
        const tk = row.trim().split(" ")
        // console.log(tk)
        if (tk.length == 5) {
            if (tk[1]=='OR') {

                if (ok(tk[0]) && ok(tk[2])) {
                    vars[tk[4]] = value(tk[0]) | value(tk[2])
                    _inputs[idx] = "* * * * * * " + _inputs[idx]
                } else {
                    complete=false
                }

            } else if (tk[1]=='AND') {

                if (ok(tk[0]) && ok(tk[2])) {
                    vars[tk[4]] = value(tk[0]) & value(tk[2])
                    _inputs[idx] = "* * * " + _inputs[idx]
                } else {
                    complete=false
                }

            } else if (tk[1]=='LSHIFT') {

                if (ok(tk[0]) && ok(tk[2])) {
                    vars[tk[4]] = value(tk[0]) << value(tk[2])
                    _inputs[idx] = "* * * " + _inputs[idx]
                } else {
                    complete=false
                }

            } else if (tk[1]=='RSHIFT') {

                if (ok(tk[0]) && ok(tk[2])) {
                    vars[tk[4]] = value(tk[0]) >> value(tk[2])
                    _inputs[idx] = "* * * " + _inputs[idx]
                } else {
                    complete=false
                }

            }
        } else if (tk.length == 4 && tk[0]=='NOT') {

            if (ok(tk[1])) {
                vars[tk[3]] = value(tk[1]) ^ 0xFFFF
                _inputs[idx] = "* * * " + _inputs[idx]
            } else {
                complete=false
            }

        } else if (tk.length == 3 && !isNum(tk[0]) ) {

            if (ok(tk[0])) {
                vars[tk[2]] = value(tk[0])
                _inputs[idx] = "* * * " + _inputs[idx]
            } else {
                complete=false
            }

        }
    }
    return complete
}

let rs = process(true)

while (!rs) {
    rs = process(false)
}

console.log(`A: ${vars['a']}`)
const _a = vars['a']
const _inputs2 = input.replaceAll("\r","").split("\n")
_inputs = []
vars = {}

for (let idx = 0; idx < _inputs2.length; ++idx) {
    const row = _inputs2[idx]
    const tk = row.trim().split(" ")
    for (let z = 0; z < row.length-1; ++z) {
        if (tk[z] == "b") {
            tk[z] = _a
        }
    }
    _inputs.push(tk.join(" "))
}

rs = process(true)

while (!rs) {
    rs = process(false)
}

console.log(`B: ${vars['a']}`)
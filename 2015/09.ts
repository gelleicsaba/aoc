export {}
import { input } from './09data'
import cloneDeep from 'clone-deep'

let _inputs: any|undefined = input.replaceAll("\r","").split("\n")

let cities: any[]|undefined = []

// get all cities
for (let x=0; x<_inputs.length; ++x) {
    const row = _inputs[x].trim()
    const parts = row.split(" ")
    const from = parts[0].trim()
    const to = parts[2].trim()
    //const km = parseInt(parts[4].trim())

    if (!cities[from]) {
        cities[from] = from
    }
    if (!cities[to]) {
        cities[to] = to
    }
}
//console.log(cities)

// aliases e.g.: A=Faerun, B=Norrath, ....
let als = {}
// aliases versa e.g.: Faerun=A, Norrath=B, ...
let alsv = {}

// modified input with alias names
let _minput = cloneDeep(_inputs)

let y=0
const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for (let key in cities) {
    als[key.toString()] = A.charAt(y)
    alsv[A.charAt(y)] = key.toString()
    for (let x=0; x<_minput.length; ++x) {
        _minput[x] = _minput[x].replaceAll(key.toString(), `(${A.charAt(y)})`)
    }
    ++y
}
for (let key in alsv) {
    for (let y=0; y<_minput.length; ++y) {
        //console.log(`(${alsv[key].toString()})`)
        _minput[y] = _minput[y].replaceAll(`(${key.toString()})`, key.toString())
        _minput[y] = _minput[y].replaceAll(" to ", ",")
        _minput[y] = _minput[y].replaceAll(" = ", ",")
    }
}

// reverse nodes to extend them, e.g.: AB - BA , FG - GF
let r: any[]|undefined = []
const distances: any = {}
for (let x=0; x<_minput.length; ++x) {
    const t = _minput[x].split(",")
    r.push(`${t[0]}${t[1]}`)
    r.push(`${t[1]}${t[0]}`)
    distances[`${t[0]}${t[1]}`] = parseInt(t[2])
    distances[`${t[1]}${t[0]}`] = parseInt(t[2])
}
console.log("distances: ",distances)
console.log("routes: ",r)
let q1: any[]|undefined = []

_inputs=undefined
_minput=undefined
cities=undefined

// we only push element if path not exists
const pushNonExist = (obj: string[], w: string) => {
    const check = obj.filter(g => g == w)
    if (check.length == 0) {
        obj.push(w)
    }
}

// extends paths to logical connections: if we have AB & DA then we can step through DAB
console.log("Step 1/6...")
for (let x=0; x<r.length; ++x) {
    for (let y=0; y<r.length; ++y) {
        if (x==y) continue
        if (r[x].charAt(0) == r[y].charAt(0) && r[y].charAt(1) != r[x].charAt(1) ) {
            pushNonExist(q1, `${r[y].charAt(1)}${r[x]}`)
        }
        else if (r[x].charAt(1) == r[y].charAt(0) && r[x].charAt(1) != r[y].charAt(0) ) {
            pushNonExist(q1, `${r[x]}${r[y].charAt(1)}`)
        }
    }
}
//console.log(JSON.stringify(q1))
console.log("  Done.")

console.log("Step 2/6...")

// same chars is help to except cycle routes e.g.  ABA or FGHF
const sameChars = (s: string): boolean => {
    const tmp=[]
    for (let x=0; x<s.length; ++x) {
        if (!tmp[s.charAt(x)]) {
            tmp[s.charAt(x)] = 1
        } else {
            ++tmp[s.charAt(x)]
        }
    }
    for (let x in tmp) {
        if (tmp[x]>1) {
            return true
        }
    }
    return false
}

// extends paths to logical connections: if we have AB & DA then we can step through DAB
let q2: any[]|undefined = []
for (let x=0; x<q1.length; ++x) {
    for (let y=0; y<r.length; ++y) {

        if (q1[x].charAt(2) == r[y].charAt(0)) {
            const tmp = `${q1[x]}${r[y].charAt(1)}`
            if (!sameChars(tmp)) pushNonExist(q2, tmp)
        }
        else if (q1[x].charAt(2) == r[y].charAt(1)) {
            const tmp = `${q1[x]}${r[y].charAt(0)}`
            if (!sameChars(tmp)) pushNonExist(q2, tmp)
        }
    }
}
q1=undefined
//console.log(JSON.stringify(q2))
console.log("  Done.")

// we extends more paths to logical connections, like in previous routine e.g: ACD,AF -> FACD
console.log("Step 3/6...")
let q3: any[]|undefined = []
for (let x=0; x<q2.length; ++x) {
    for (let y=0; y<r.length; ++y) {

        if (q2[x].charAt(3) == r[y].charAt(0)) {
            const tmp = `${q2[x]}${r[y].charAt(1)}`
            if (!sameChars(tmp)) pushNonExist(q3, tmp)
        }
        else if (q2[x].charAt(3) == r[y].charAt(1)) {
            const tmp = `${q2[x]}${r[y].charAt(0)}`
            if (!sameChars(tmp)) pushNonExist(q3, tmp)
        }
    }
}
q2=undefined
//console.log(JSON.stringify(q3))
console.log("  Done.")

// we extends more paths to logical connections, like in previous routine (6 chars result)
console.log("Step 4/6...")
let q4: any[]|undefined = []
for (let x=0; x<q3.length; ++x) {
    for (let y=0; y<r.length; ++y) {

        if (q3[x].charAt(4) == r[y].charAt(0)) {
            const tmp = `${q3[x]}${r[y].charAt(1)}`
            if (!sameChars(tmp)) pushNonExist(q4, tmp)
        }
        else if (q3[x].charAt(4) == r[y].charAt(1)) {
            const tmp = `${q3[x]}${r[y].charAt(0)}`
            if (!sameChars(tmp)) pushNonExist(q4, tmp)
        }
    }
}
q3=undefined
//console.log(JSON.stringify(q4))
console.log("  Done.")

// we extends more paths to logical connections, like in previous routine (7 chars result)
console.log("Step 5/6...")
let q5: any[]|undefined = []
for (let x=0; x<q4.length; ++x) {
    for (let y=0; y<r.length; ++y) {

        if (q4[x].charAt(5) == r[y].charAt(0)) {
            const tmp = `${q4[x]}${r[y].charAt(1)}`
            if (!sameChars(tmp)) pushNonExist(q5, tmp)
        }
        else if (q4[x].charAt(5) == r[y].charAt(1)) {
            const tmp = `${q4[x]}${r[y].charAt(0)}`
            if (!sameChars(tmp)) pushNonExist(q5, tmp)
        }
    }
}
q4=undefined
//console.log(JSON.stringify(q5))
console.log("  Done.")

// we extends more paths to logical connections, like in previous routine (finally 8 chars result)
console.log("Step 6/6...")
let q6: any[]|undefined = []
for (let x=0; x<q5.length; ++x) {
    if (x%1000==0) console.log(`  - ${x}/${q5.length}`)
    for (let y=0; y<r.length; ++y) {

        if (q5[x].charAt(6) == r[y].charAt(0)) {
            const tmp = `${q5[x]}${r[y].charAt(1)}`
            if (!sameChars(tmp)) pushNonExist(q6, tmp)
        }
        else if (q5[x].charAt(6) == r[y].charAt(1)) {
            const tmp = `${q5[x]}${r[y].charAt(0)}`
            if (!sameChars(tmp)) pushNonExist(q6, tmp)
        }
    }
}
q5=undefined
console.log("  Done.")
console.log("Num of routes: ",q6.length)

// get the minimum distance of the routes
let min = 9999999999
let path=""
for (let x=0; x<q6.length; ++x) {
    const row=q6[x]
    let dst = 0
    for (let y=0; y<q6[x].length-1; ++y) {
        const tmp = `${q6[x].charAt(y)}${q6[x].charAt(y+1)}`
        dst += distances[tmp]
    }
    if (dst < min) {
        min = dst
        path = q6[x]
    }
}

// in addition we print the route (info)
let sb=""
for (let x=0;x<path.length; ++x) {
    const c=path.charAt(x)
    if (x==0) {
        sb+=alsv[c]
    } else {
        sb+=`->${alsv[c]}`
    }
}
console.log("Path: ",sb)
console.log("A: ", min)


export {}
import { input } from './02data'

/*
const test =
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

const testB =
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`
*/

const _input = input.replaceAll(": ",":").replaceAll("\r","").split("\n")
//const _input = test.replaceAll(": ",":").replaceAll("\r","").split("\n")
//const _input = testB.replaceAll(": ",":").replaceAll("\r","").split("\n")

let result = 0
for (let y=0; y<_input.length; ++y) {
    const row = _input[y].trim()
    const sections = row.split(":")
    const from = parseInt(sections[0].split("-")[0])
    const to = parseInt(sections[0].split("-")[1].split(" ")[0])
    const ch = sections[0].split("-")[1].split(" ")[1].trim()
    const pass = sections[1].trim()
    //console.log(`${from}/${to}/${ch}/${pass}`)

    let count = 0
    for (let z=0; z<pass.length; ++z) {
        //console.log(`${pass.charAt(z)} ? ${ch}`)
        if (pass.charAt(z)==ch) {
            ++count
        }
    }
    //console.log("count",count)
    if (count <= to && count >= from) {
        ++result
    }
}
console.log("A: ",result)


result = 0
for (let y=0; y<_input.length; ++y) {
    const row = _input[y].trim()
    const sections = row.split(":")
    const pos1 = parseInt(sections[0].split("-")[0])
    const pos2 = parseInt(sections[0].split("-")[1].split(" ")[0])
    const ch = sections[0].split("-")[1].split(" ")[1].trim()
    const pass = sections[1].trim()


    if ( (pass.charAt(pos1-1)==ch && pass.charAt(pos2-1)!=ch) ||
            (pass.charAt(pos2-1)==ch && pass.charAt(pos1-1)!=ch) ) {
        ++result
    } else {
        console.log(`refuse: ${pos1}/${pos2}/${ch}/${pass}`)
    }
}
console.log("B: ",result)



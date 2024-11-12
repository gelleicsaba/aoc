export {}
import { input } from './04data'

const test =
`aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`

const _input = input.replaceAll("\r","").split("\n")
//const _input = test.replaceAll("\r","").split("\n")

let result=0
for (let cmd of _input) {
    const chsum = cmd.split("[")[1].replace("]","")
    const lts = cmd.split("[")[0].replace(new RegExp("[0-9]", "g"), "")
    const id = parseInt(cmd.split("[")[0].replace(new RegExp("[^0-9]", "g"), ""))
    const ties = lts.substring(0,lts.length-1).split("-")
    console.log(`${cmd} : ${chsum}  ${lts} ${ties}  ${id}  `)

    let letters = {}
    for (let t=0; t<lts.length; ++t) {
        const ch = lts.charAt(t)
        if (ch!="-") {
            if (letters[ch]) {
                ++letters[ch]
            } else {
                letters[ch]=1
            }
        }
    }
    let n = 1;
    let places = []
    for (let q=100; q>0; --q) {
        let found=false
        for (let key in letters) {
            const val=letters[key]
            if (val==q) {
                places[key] = n
                found=true
            }
        }
        if (found) {
            ++n
        }
    }
    letters={}
    console.log(places)

    let maxPlace=0
    for (let key in places) {
        const val = places[key]
        if (val > maxPlace) {
            maxPlace=val
        }
    }
    console.log("max: ", maxPlace)

    const findInTies = (letter: string, src: any): number => {
        for (let h=0; h<src.length; ++h) {
            if (src[h].includes(letter)) {
                return h
            }
        }
        return -1
    }

    const orderedTies = JSON.parse(JSON.stringify(ties))
    const orderTies = () => {
        for (let x=0; x<orderedTies.length; ++x) {
            for (let y=0; y<orderedTies.length-1; ++y) {
                if (orderedTies[y] > orderedTies[y+1]) {
                    const tmp = orderedTies[y]
                    orderedTies[y] = orderedTies[y+1]
                    orderedTies[y+1] = tmp
                }
            }
        }
    }
    orderTies()
    console.log("orderedTies",orderedTies)

    let preladder = 0
    let prepos = 1
    let ok=true
    let preladder2 = 0
    for (let q=0; q<chsum.length; ++q) {
        const val=chsum.charAt(q)
        if (places[val]==undefined) {
            ok=false
        }
        if (places[val] < maxPlace) {
            console.log(`findInTies(${val}): `, findInTies(val, ties))
            if (!(findInTies(val, ties) >= preladder && places[val] >= prepos)) {
                ok=false
            } else {
                preladder = findInTies(val, ties)
                prepos = places[val]
            }
        } else {
            if (findInTies(val, orderedTies) < preladder2) {
                ok = false
            } else {
                preladder2 = findInTies(val, orderedTies)
            }

        }
    }
    if (ok) {
        result += id
    }
    console.log("ok: ",ok)
}

console.log("A: ", result)

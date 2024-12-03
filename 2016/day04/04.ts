import { input } from './04data'
const mutate = (v: string) => v.replaceAll("\r","").split("\n")
// const testA =
// `aaaaa-bbb-z-y-x-123[abxyz]
// a-b-c-d-e-f-g-h-987[abcde]
// not-a-real-room-404[oarel]
// totally-real-room-200[decoy]`
// const _input = mutate(testA)
// let _input = mutate(input)
// const testB =
// `qzmt-zixmtkozy-ivhz-343[abcde]`
// let _input = mutate(testB)

let _input = mutate(input)
const list: any[]=[]
for (let row of _input) {
    const sp = row.trim().split('-')
    const words: string[] = []
    for (let x=0;x<sp.length-1;++x) {
        words.push(sp[x])
    }
    const keys = sp[sp.length-1].split("[")
    const id = parseInt(keys[0])
    const key = keys[1].replace("]","")
    list.push({words: words.join(''), id: id, key:key, chars: []})
}
const charCount = (str: string, c: string): number => {
    var result = 0, i = 0
    for(i;i<str.length;i++)if(str[i]==c[0])result++
    return result
}
const ABC="abcdefghijklmnopqrstuvwxyz"
const reverseChar = (ch: string) => {
    return ABC[ABC.length - 1 - ABC.indexOf(ch)]
}
let sum=0
for (let k in list) {
    const ls = list[k]
    let charsCount = {}
    for (let x=0;x<ls.words.length;++x) {
        const ch = ls.words[x]
        if (charsCount[ch]==undefined) {
            charsCount[ch] = charCount(ls.words,ch)
        }
    }
    for (let key in charsCount) {
        const val = charsCount[key]
        ls.chars.push(`${val.toString().padStart(2, '0')},${reverseChar(key)},${key}`)
    }
    ls.chars.sort((a: string,b: string) => b.localeCompare(a))
    let encrypt = ''
    for (let x=0;x<5;++x) {
        encrypt+=ls.chars[x].split(',')[2]
    }
    //console.log(`${ls.key} => ${encrypt} => ${encrypt == ls.key?'REAL ROOM':'BAD'}`)
    if (encrypt == ls.key) {
        sum += ls.id
    }
}
console.log(`A: ${sum}`)

const shiftChar = (ch: string, add: number) => {
    return ABC[(ABC.indexOf(ch) + add) % ABC.length]
}
for (let row of list) {
    let sh=''
    for (let x=0;x<row.words.length;++x) {
        sh+=shiftChar(row.words[x], row.id)
    }
    if (sh == 'northpoleobjectstorage') {
        sum = row.id
    }
}
console.log(`B: ${sum}`)

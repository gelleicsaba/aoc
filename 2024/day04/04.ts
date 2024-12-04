import { input } from './04data'
const mutate = (v: string): string[] => v.replaceAll("\r","").split("\n")
// const test =
// `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`
// let _input=mutate(test)

let _input = mutate(input)

let m: any[] = []
let lenH = 0
let lenW = 0
const createArray = () => {
    m=[]
    lenH = 0
    lenW = _input[0].length
    for (let str of _input) {
        let dim: string[] = Array(str.length)
        for (let x=0;x<str.length;++x) {
            dim[x]=str[x]
        }
        m.push(dim)
        ++lenH
    }
}
createArray()
const WORD = 'XMAS'
let founds = {}
const checkChar = (m: any[], x: number, y: number, c: string) =>
    x<lenW && y<lenH && x>=0 && y>=0 ? m[y][x]==c[0]?1:0 : 0
const search = (m: any[], x: number, y: number, addx: number, addy: number): number => {
    let ch1 = ''
    let ch2 = ''
    let px=x
    let py=y
    for (let t=0;t<WORD.length;++t) {
        if (! checkChar(m,px,py,WORD[t])) {
            return 0
        }
        ch1 += `[${px.toString()},${py.toString()}]`
        ch2 = `[${px.toString()},${py.toString()}]` + ch2
        px+=addx
        py+=addy
    }
    if (founds[ch1]!==undefined || founds[ch2]!==undefined) {
        return 0
    }
    founds[ch1]=1
    founds[ch2]=1
    return 1
}

let sum=0
const searchParams = [
    [1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]
]
for (let y=0;y<lenH;++y) {
    for (let x=0;x<lenW;++x) {
        for (let q of searchParams) {
            sum += search(m,x,y,q[0],q[1])
        }
    }
}
console.log(`A: ${sum}`)

const MAS = 'MAS'
const SAM = 'SAM'
const searchMAS = (m: any[], x: number, y: number, r1: boolean, r2: boolean) => {
    let w1 = !r1?MAS:SAM
    let w2 = !r2?MAS:SAM
    let n = 0
    n+=checkChar(m,x-1,y-1,w1[0])
    n+=checkChar(m,x+1,y-1,w2[0])
    n+=checkChar(m,x,y,w1[1])
    n+=checkChar(m,x-1,y+1,w2[2])
    n+=checkChar(m,x+1,y+1,w1[2])
    return n==5?1:0
}
sum=0
for (let y=0;y<lenH;++y) {
    for (let x=0;x<lenW;++x) {
        let tmp=0
        tmp=searchMAS(m,x,y,false,false)
        if (tmp==0) {
            tmp=searchMAS(m,x,y,true,false)
        }
        if (tmp==0) {
            tmp=searchMAS(m,x,y,true,true)
        }
        if (tmp==0) {
            tmp=searchMAS(m,x,y,false,true)
        }
        if (tmp==1) {
            ++sum
        }
    }
}
console.log(`B: ${sum}`)

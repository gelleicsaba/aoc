import { input } from './08data'
import { tuple } from '../lib/aoclib'
// const test=
// `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`
// const _input = test.replaceAll("\r","").split("\n")
const _input = input.replaceAll("\r","").split("\n")
let m: any[]=_input.map(v=>v.split(''))
const antennas = {}
for (let y=0;y<m.length;++y) {
    for (let x=0;x<m[0].length; ++x) {
        if (m[y][x]!='.'&&m[y][x]!='#') {
            const c=m[y][x]
            if (antennas[c]!==undefined) {
                antennas[c].push({x:x,y:y})
            } else {
                antennas[c]=[{x:x,y:y}]
            }
        }
    }
}
const antinodePos = (x1: number, y1: number, x2: number, y2: number): any[] => {
    const xx=x2-x1
    const yy=y2-y1
    const ax1 = x1 - xx
    const ay1 = y1 - yy
    const ax2 = x2 + xx
    const ay2 = y2 + yy
    const nodes: any[]=[]
    if (ax1>=0&&ax1<m[0].length&&ay1>=0&&ay1<m.length) {
        nodes.push({x:ax1,y:ay1})
    }
    if (ax2>=0&&ax2<m[0].length&&ay2>=0&&ay2<m.length) {
        nodes.push({x:ax2,y:ay2})
    }
    return nodes
}
let plusOverlaps={}
for (let key in antennas) {
    const coords=antennas[key]
    const ab={}
    for (let a=0;a<coords.length;++a) {
        for (let b=0;b<coords.length;++b) {
            // ab: lets exclude the cases when (a,b) & (b,a) calculate twice the same results
            if (a!=b && ab[tuple(a,b)]==undefined) {
                const ac = coords[a]
                const bc = coords[b]
                const nodes=antinodePos(ac.x,ac.y,bc.x,bc.y)
                for (let node of nodes) {
                    if (m[node.y][node.x]=='.') {
                        m[node.y][node.x]='#'
                    } else if (m[node.y][node.x] != '#') {
                        plusOverlaps[tuple(node.x,node.y)]=1
                    }
                }
                ab[tuple(a,b)]=1
                ab[tuple(b,a)]=1
            }
        }
    }
}
const getCountOfAntinodes = () => {
    let sum=0
    for (let y=0;y<m.length;++y) {
        sum += m[y].filter((v)=>v=="#").length
    }
    return sum
}
let countOverlaps=0
for (let key in plusOverlaps) ++countOverlaps
console.log(`A: ${getCountOfAntinodes()+countOverlaps}`)

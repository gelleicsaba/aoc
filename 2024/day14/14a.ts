export {}
import { input } from './14data'
import { tuple, tupleToArray } from '../lib/aoclib'
const mutate=(s:string)=>s.replaceAll("\r","").replaceAll('p=','').replaceAll(' v=',',').split("\n")
// const test=
// `p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`
// const _input=mutate(test)
// const width=11
// const height=7
// const seconds=100
const _input=mutate(input)
const width=101
const height=103
const seconds=100
const ops: any[]=[]
for (let row of _input) {
    const sp=row.split(',').map(v=>parseInt(v))
    ops.push({p:{x:sp[0],y:sp[1]},v:{x:sp[2],y:sp[3]}})
}
const flipX=(x:number):number=>width-1-x
const flipY=(x:number):number=>height-1-x
const limX=(x:number):number=>x%width
const limY=(x:number):number=>x%height
for (let op of ops) {
    let px=op.p.x
    let py=op.p.y
    let vx=op.v.x
    let vy=op.v.y
    if (vx>=0) {
        px=limX(px+vx*seconds)
    } else {
        px=flipX(limX(flipX(px)-vx*seconds))
    }
    if (vy>=0) {
        py=limY(py+vy*seconds)
    } else {
        py=flipY(limY(flipY(py)-vy*seconds))
    }
    op.p.x=px
    op.p.y=py
}
const positions={}
for (let op of ops) {
    positions[tuple(op.p.x, op.p.y)]=positions[tuple(op.p.x, op.p.y)]?positions[tuple(op.p.x, op.p.y)]+1:1
}
// const dump=()=>{
//     for (let y=0;y<height;++y) {
//         let sb=''
//         for (let x=0;x<width;++x) {
//             if (positions[tuple(x,y)]) {
//                 sb+=positions[tuple(x,y)].toString()
//             } else {
//                 sb+='.'
//             }
//         }
//         console.log(sb)
//     }
// }
// dump()
const origoX=Math.trunc(width/2)
const origoY=Math.trunc(height/2)
let topLeft=0
let bottomLeft=0
let topRight=0
let bottomRight=0
for (let n in positions) {
    const pos=tupleToArray(n,(v)=>parseInt(v))
    const x=pos[0]
    const y=pos[1]
    const num=positions[n]
    if (x<origoX && y<origoY) topLeft+=num
    if (x<origoX && y>origoY) bottomLeft+=num
    if (x>origoX && y<origoY) topRight+=num
    if (x>origoX && y>origoY) bottomRight+=num
}
// console.log(`topLeft:${topLeft} bottomLeft:${bottomLeft} topRight:${topRight} bottomRight:${bottomRight}`)
console.log(`A: ${topLeft*bottomLeft*topRight*bottomRight}`)

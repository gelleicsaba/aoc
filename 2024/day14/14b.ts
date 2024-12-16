export {}
import { input } from './14data'
import { tuple, tupleToArray } from '../lib/aoclib'
import cloneDeep from '../node_modules/clonedeep'
const mutate=(s:string)=>s.replaceAll("\r","").replaceAll('p=','').replaceAll(' v=',',').split("\n")
const _input=mutate(input)
const width=101
const height=103
let ops: any[]=[]
for (let row of _input) {
    const sp=row.split(',').map(v=>parseInt(v))
    ops.push({p:{x:sp[0],y:sp[1]},v:{x:sp[2],y:sp[3]}})
}
const flipX=(x:number):number=>width-1-x
const flipY=(x:number):number=>height-1-x
const limX=(x:number):number=>x%width
const limY=(x:number):number=>x%height
const trySeconds=(_seconds: number)=>{
    const _ops=cloneDeep(ops)
    for (let op of _ops) {
        let px=op.p.x
        let py=op.p.y
        let vx=op.v.x
        let vy=op.v.y
        if (vx>=0) {
            px=limX(px+vx*_seconds)
        } else {
            px=flipX(limX(flipX(px)-vx*_seconds))
        }
        if (vy>=0) {
            py=limY(py+vy*_seconds)
        } else {
            py=flipY(limY(flipY(py)-vy*_seconds))
        }
        op.p.x=px
        op.p.y=py
    }
    const positions: any={}
    const p=(x:number,y:number):any=>positions[tuple(x,y)]
    for (let op of _ops) {
        positions[tuple(op.p.x,op.p.y)]=1
    }
    for (let y=0;y<height;++y) {
        for (let x=0;x<width;++x) {
            if (
                p(x,y)
                && p(x-1,y+1)
                && p(x-2,y+2)
                && p(x+1,y+1)
                && p(x+2,y+2)
                && p(x,y+1)
                && p(x,y+2)
                && p(x-1,y+2)
                && p(x+1,y+2)
            ) {
                ops=_ops
                return true
            }
        }
    }
    return false
}
const dump=()=>{
    const positions: any={}
    for (let op of ops) {
        positions[tuple(op.p.x,op.p.y)]=1
    }
    for (let y=0;y<height;++y) {
        let sb=''
        for (let x=0;x<width;++x) {
            if (positions[tuple(x,y)]) {
                sb+=positions[tuple(x,y)].toString()
            } else {
                sb+='.'
            }
        }
        console.log(sb)
    }
}
let sec=100
let done=false
while(!done) {
    done=trySeconds(sec)
    if (done) {
        dump()
        console.log(`B: ${sec}`)
        break
    }
    if (sec%1000==0) {
        console.log(sec)
    }
    ++sec
}

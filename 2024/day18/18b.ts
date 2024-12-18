export {}
import { input } from './18data'
import { tuple } from '../lib/aoclib'
const mutate=(s:string)=>s.replaceAll("\r","").split("\n").map(v=>v.split(',').map(q=>parseInt(q)))
const WIDTH=71
const HEIGHT=71
const _input=mutate(input)
let m={}
let idx=0
for (let p of _input) {
    if (idx<1024) {
        m[tuple(p[0],p[1])]={x:p[0],y:p[1]}
    }
    ++idx
}
const mem=(x:number,y:number)=>m[tuple(x,y)]
// const dump=()=>{
//     for (let y=0;y<HEIGHT;++y) {
//         let sb=''
//         for (let x=0;x<WIDTH;++x) {
//             sb+=mem(x,y)?'#':'.'
//         }
//         console.log(sb)
//     }
// }
// dump()
const isValidNode=(x: number, y:number)=>
    x>=0&&x<=WIDTH&&y>=0&&y<HEIGHT&&!mem(x,y)
let nodes={}
let visited={}
let cost={}
const isVisited=(x:number,y:number)=>visited[tuple(x,y)]
const setVisited=(x:number,y:number)=>visited[tuple(x,y)]=true
const getNode=(x:number,y:number)=>nodes[tuple(x,y)]
const setCost=(x:number,y:number,val:number)=>cost[tuple(x,y)]=val
const getCost=(x:number,y:number):number=>cost[tuple(x,y)]
const INF=999999
let pq: any[]=[]
const enq=(x:number,y:number)=>{
    pq.push({x:x,y:y})
    pq.sort((a,b)=>getCost(a.x,a.y) - getCost(b.x,b.y))
}
const deq=(): any=>{
    if (pq.length==0) {
        return
    }
    return pq.shift()
}
const resetWith=(ox: number, oy:number)=>{
    pq=[]
    visited={}
    cost={}
    nodes={}
    m[tuple(ox,oy)]={x:ox,y:oy}
    for (let y=0;y<HEIGHT;++y) {
        for (let x=0;x<WIDTH;++x) {
            if (isValidNode(x,y-1)) {
                if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
                nodes[tuple(x,y)].push({tx:x,ty:y-1})
            }
            if (isValidNode(x-1,y)) {
                if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
                nodes[tuple(x,y)].push({tx:x-1,ty:y})
            }
            if (isValidNode(x+1,y)) {
                if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
                nodes[tuple(x,y)].push({tx:x+1,ty:y})
            }
            if (isValidNode(x,y+1)) {
                if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
                nodes[tuple(x,y)].push({tx:x,ty:y+1})
            }
            setCost(x,y,x==0&&y==0?0:INF)
        }
    }
}
let quit=false
for (let q=1024;q<_input.length;++q) {
    console.log(`step ${q}...`)
    const ox=_input[q][0]
    const oy=_input[q][1]
    resetWith(ox,oy)
    setCost(0,0,0)
    enq(0,0)
    while (pq.length>0) {
        const el = deq()
        if (! isVisited(el.x,el.y)) {
            setVisited(el.x,el.y)
            const _x=el.x
            const _y=el.y
            for (let route of getNode(_x,_y)) {
                const tx=route.tx
                const ty=route.ty
                if (!isVisited(tx,ty) && getCost(tx,ty)>getCost(_x,_y)+1) {
                    setCost(tx,ty,getCost(_x,_y)+1)
                    enq(tx,ty)
                }
            }
        }
    }
    const result=cost[tuple(WIDTH-1,HEIGHT-1)]
    if (result==INF) {
        console.log(`B: ${ox},${oy}`)
        quit=true
        break
    }
}





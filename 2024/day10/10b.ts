import { input } from './10data'
import { tuple } from '../lib/aoclib'
const mutate = (s) => s.replaceAll("\r","").split("\n").map((v: string)=>v.split(''))
// const test1 =
// `.....0.
// ..4321.
// ..5..2.
// ..6543.
// ..7..4.
// ..8765.
// ..9....`
// const m: any[][] = mutate(test1)
const m: any[][] = mutate(input)
const startPoints: any[]=[]
for (let y=0;y<m.length;++y) {
    for (let x=0;x<m[0].length;++x) {
        if (m[y][x]=='0') {
            startPoints.push({x:x,y:y})
        }
    }
}
const checkOneStep=(_x: number, _y: number, _dx: number, _dy: number)=>
    _x+_dx>=0&&_x+_dx<=m[0].length&&
        _y+_dy>=0&&_y+_dy<m.length&&
        m[_y+_dy][_x+_dx]!='.'&&
        parseInt(m[_y][_x])+1==parseInt(m[_y+_dy][_x+_dx])

let routes: any={}
const findRoutes=(state: any)=> {
    let x=state.x
    let y=state.y
    let steps=state.steps
    steps.push(tuple(x,y))
    if (m[y][x]=='9') {
        routes[steps.join('')]=1
        return
    }
    if (y>0&&checkOneStep(x,y,0,-1)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x,y:y-1,steps})
    }
    if (y<m.length-1&&checkOneStep(x,y,0,+1)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x,y:y+1,steps})
    }
    if (x>0&&checkOneStep(x,y,-1,0)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x-1,y:y,steps})
    }
    if (x<m[0].length-1&&checkOneStep(x,y,+1,0)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x+1,y:y,steps})
    }
}
for (let point of startPoints) {
    findRoutes({startX:point.x,startY:point.y,x:point.x,y:point.y,steps:[]})
}
let sum=0
for (let key in routes) {
    ++sum
}
console.log(`B: ${sum}`)

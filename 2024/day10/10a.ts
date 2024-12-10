import { input } from './10data'
import { tuple } from '../lib/aoclib'
const mutate = (s) => s.replaceAll("\r","").split("\n").map((v: string)=>v.split(''))
// const test1 =
// `...0...
// ...1...
// ...2...
// 6543456
// 7.....7
// 8.....8
// 9.....9`
// const test2 =
// `..90..9
// ...1.98
// ...2..7
// 6543456
// 765.987
// 876....
// 987....`
// const test3 =
// `10..9..
// 2...8..
// 3...7..
// 4567654
// ...8..3
// ...9..2
// .....01`
// const test4 =
// `89010123
// 78121874
// 87430965
// 96549874
// 45678903
// 32019012
// 01329801
// 10456732`
// const m: any[][] = mutate(test1)
// const m: any[][] = mutate(test2)
// const m: any[][] = mutate(test3)
// const m: any[][] = mutate(test4)
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
    if (m[y][x]=='9') {
        routes[tuple(state.startX,state.startY,x,y)]=1
        return
    }
    if (y>0&&checkOneStep(x,y,0,-1)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x,y:y-1})
    }
    if (y<m.length-1&&checkOneStep(x,y,0,+1)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x,y:y+1})
    }
    if (x>0&&checkOneStep(x,y,-1,0)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x-1,y:y})
    }
    if (x<m[0].length-1&&checkOneStep(x,y,+1,0)) {
        findRoutes({startX:state.startX,startY:state.startY,x:x+1,y:y})
    }
}
for (let point of startPoints) {
    findRoutes({startX:point.x,startY:point.y,x:point.x,y:point.y})
}
let n=0
for (let key in routes) {
    ++n
}
console.log(n)

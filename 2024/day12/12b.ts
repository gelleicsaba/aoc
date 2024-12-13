export {}
import { input } from './12data'
import { tuple } from '../lib/aoclib'
import cloneDeep from 'clonedeep'
const mutate=(x: string): any[]=>x.replaceAll("\r","").split("\n")
// const test=
// `AAAAAA
// AAABBA
// AAABBA
// ABBAAA
// ABBAAA
// AAAAAA`
// const _map=mutate(test)
const _map=mutate(input)
let map: any[]=[]
const pushNDot = (arr:any[], n:number) => {
    for (let x=0;x<n;++x) arr.push('.')
}
for (let y=0;y<_map.length;++y) {
    let sb: any[]=[]
    let sb2: any[]=[]
    sb.push('.')
    sb2.push('.')
    for (let x=0;x<_map[0].length;++x) {
        pushNDot(sb,3)
        sb.push(_map[y][x])
        pushNDot(sb2,4)
    }
    sb.push('.')
    sb2.push('.')
    pushNDot(sb2,4)
    pushNDot(sb,4)
    if (y==0) map.push(cloneDeep(sb2))
    map.push(cloneDeep(sb2))
    map.push(cloneDeep(sb2))
    map.push(cloneDeep(sb2))
    map.push(cloneDeep(sb))
    if (y==_map.length-1) {
        map.push(cloneDeep(sb2))
        map.push(cloneDeep(sb2))
        map.push(cloneDeep(sb2))
        map.push(cloneDeep(sb2))
    }
}
const visits={}
const getPlotPoints=(x: number, y: number, ch: string, points: any[]): any[] => {
    if (x>=0 && x<=map[0].length && y>=0 && y<map.length && map[y][x]==ch && !visits[tuple(x,y)]) {
        visits[tuple(x,y)]=1
        points.push({x:x,y:y})
    } else {
        return points
    }
    points=getPlotPoints(x+4,y,ch,points)
    points=getPlotPoints(x-4,y,ch,points)
    points=getPlotPoints(x,y-4,ch,points)
    points=getPlotPoints(x,y+4,ch,points)
    return points
}
// uncomment this line to show fence borders
// const dump=(_map: any[])=>{
//     for (let y=0;y<_map.length;++y) {
//         let sb=''
//         for (let x=0;x<_map[0].length;++x) {
//             sb+=_map[y][x]
//         }
//         console.log(sb)
//     }
//     // console.log()
// }
const borders = (_map: any[], px:number, py: number, l: boolean, r: boolean, t: boolean, b: boolean) => {
    if (l) {
        for (let y=0;y<5;++y) _map[py-2+y][px-2]='#'
    }
    if (r) {
        for (let y=0;y<5;++y) _map[py-2+y][px+2]='#'
    }
    if (t) {
        for (let x=0;x<5;++x) _map[py-2][px-2+x]='#'
    }
    if (b) {
        for (let x=0;x<5;++x) _map[py+2][px-2+x]='#'
    }
}
const calc = (char: string, _points: any[]) => {
    const pointsDict={}
    for (let point of _points) {
        pointsDict[tuple(point.x, point.y)]=point
    }
    const _map=cloneDeep(map)
    for (let y=0;y<_map.length-4;y+=4) {
        for (let x=0;x<_map[0].length-4;x+=4) {
            const ch = _map[y][x]
            if (ch==char && pointsDict[tuple(x,y)]) {
                const l = _map[y][x-4]!=char
                const r = _map[y][x+4]!=char
                const t = _map[y-4][x]!=char
                const b = _map[y+4][x]!=char
                borders(_map, x, y, l, r, t, b)
            }
        }
    }
    // repair : Split the crossings
    for (let y=2;y<_map.length-4;y+=4) {
        for (let x=2;x<_map[0].length-4;x+=4) {
            if (_map[y][x]=='#'
                    && _map[y][x-1]=='#'
                    && _map[y][x+1]=='#'
                    && _map[y-1][x]=='#'
                    && _map[y+1][x]=='#') {
                _map[y][x]='.'
            }
        }
    }
    // uncomment this line to show fence borders
    // dump(_map)
    let hLines=0
    for (let y=0;y<_map.length;++y) {
        let d=false
        for (let x=0;x<_map[0].length-2;++x) {
            if (!d && _map[y][x]=='.' && _map[y][x+1]=='#' && _map[y][x+2]=='#') {
                d=true
                ++hLines
            }
            if (d && _map[y][x]=='#' && _map[y][x+1]=='.') {
                d=false
            }
        }
    }
    let vLines=0
    for (let x=0;x<_map[0].length;++x) {
        let d=false
        for (let y=0;y<_map.length-2;++y) {
            if (!d && _map[y][x]=='.' && _map[y+1][x]=='#' && _map[y+2][x]=='#') {
                d=true
                ++vLines
            }
            if (d && _map[y][x]=='#' && _map[y+1][x]=='.') {
                d=false
            }
        }
    }
    return hLines+vLines
}
let sum=0
for (let y=0;y<map.length/4;++y) {
    for (let x=0;x<map[0].length/4;++x) {
        if (!visits[tuple(x*4,y*4)] && map[y*4][x*4]!='.') {
            const plotPoints=getPlotPoints(x*4,y*4,map[y*4][x*4],[])
            const area= plotPoints.length
            const lines=calc(map[y*4][x*4], plotPoints)
            // console.log(`${map[y*4][x*4]} -> area:${area}   lines:${lines}`)
            // console.log()
            sum+=area*lines
        }
    }
}
console.log(`B: ${sum}`)




export {}
import { input } from './16data'
import { tuple } from '../lib/aoclib'
const mutate=(s:string):string[][]=>s.replaceAll("\r","").split("\n").map(v=>v.split(''))
const test=
`###########
# E       #
# ####### #
#         #
# #########
#S        #
###########`
// const test=
// `###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.#
// #...#.....#.#.#
// #.#.#.###.#.#.#
// #.....#...#.#.#
// #.###.#.#.#.#.#
// #S..#.....#...#
// ###############`
const map=mutate(test)
// const map=mutate(input)
let start: any={}
let end: any={}
const m={}
const WIDTH=map[0].length
const HEIGHT=map.length
for (let y=0;y<HEIGHT;++y) {
    for (let x=0;x<WIDTH;++x) {
        if (map[y][x]=='.') {
            m[tuple(x,y)]={x:y,y:y}
        }
        else if (map[y][x]=='S') {
            start={x:x,y:y}
            map[y][x]='.'
            m[tuple(x,y)]={x:y,y:y}
        }
        else if (map[y][x]=='E') {
            end={x:x,y:y}
            map[y][x]='.'
            m[tuple(x,y)]={x:y,y:y}
        }

    }
}
const mem=(x:number,y:number)=>m[tuple(x,y)]
const dump=()=>{
    for (let y=0;y<map.length;++y) {
        let sb=''
        for (let x=0;x<map[0].length;++x) {
            if (x==start.x&&y==start.y) {
                sb+='S'
            }
            else if (x==end.x&&y==end.y) {
                sb+='E'
            }
            else {
                sb+=map[y][x]
            }
        }
        console.log(sb)
    }
}
dump()
const vn=(x: number, y:number)=>
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
for (let y=0;y<HEIGHT;++y) {
    for (let x=0;x<WIDTH;++x) {

        if (vn(x,y-1)) {
            if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
            nodes[tuple(x,y)].push({tx:x,ty:y-1})
        }
        if (vn(x-1,y)) {
            if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
            nodes[tuple(x,y)].push({tx:x-1,ty:y})
        }
        if (vn(x+1,y)) {
            if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
            nodes[tuple(x,y)].push({tx:x+1,ty:y})
        }
        if (vn(x,y+1)) {
            if (! nodes[tuple(x,y)]) nodes[tuple(x,y)]=[]
            nodes[tuple(x,y)].push({tx:x,ty:y+1})
        }
        setCost(x,y,x==0&&y==0?0:INF)
    }
}
const turns={}
const setTurn=(x:number,y:number)=>turns[tuple(x,y)]={x:x,y:y}
const validCoord=(y:number,x:number)=>x>=0&&x<=WIDTH&&y>=0&&y<HEIGHT
for (let y=0;y<map.length;++y) {
    for (let x=0;x<map[0].length;++x) {
        if (map[y][x]!='#' &&
            validCoord(y+1,x) && map[y+1][x]=='#' &&
            validCoord(y,x-1) && map[y][x-1]=='#'
        ) {
            setTurn(x,y)
        }
        if (map[y][x]!='#' &&
            validCoord(y+1,x) && map[y+1][x]=='#' &&
            validCoord(y,x-1) && map[y][x-1]=='#'
        ) {
            setTurn(x,y)
        }



    }
}


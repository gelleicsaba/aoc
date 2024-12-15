export {}
import { input } from './15data'
import { tuple } from '../lib/aoclib'
const mutate=(s:string):string[]=>s.replaceAll("\r","").split("\n").map(v=>v.trim())
// const test=
// `##########
// #..O..O.O#
// #......O.#
// #.OO..O.O#
// #..O@..O.#
// #O#..O...#
// #O..O..O.#
// #.OO.O.OO#
// #....O...#
// ##########

// <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
// vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
// ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
// <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
// ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
// ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
// >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
// <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
// ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
// v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`
// const _input=mutate(test)
const _input=mutate(input)
let width=0
let height=0
const map: any={}
let ops: any[]=[]
let robot={x:0,y:0}
let empty=false
let y=0
for (let row of _input) {
    if (row.length==0) {
        empty=true
    } else {
        if (!empty) {
            const sp=row.split('')
            width=sp.length
            for (let x=0;x<sp.length;++x) {
                if (sp[x]=='#' || sp[x]=='O') {
                    map[tuple(x,y)]=sp[x]
                } else if (sp[x]=='@') {
                    robot.x=x
                    robot.y=y
                }
            }
            ++y
        } else {
            const sp=row.split('')
            ops.push(sp)
        }
    }
}
height=y
const dump=()=>{
    for (let y=0;y<height;++y) {
        let sb=''
        for (let x=0;x<width;++x) {
            if (!map[tuple(x,y)]) {
                sb+=x==robot.x&&y==robot.y?'@':'.'
            } else {
                sb+=map[tuple(x,y)]
            }
        }
        console.log(sb)
    }
    console.log()
}
// dump()
const pushLeft=()=>{
    if (!map[tuple(robot.x+1,robot.y)]) {
        ++robot.x
        return
    }
    let objects:any[]=[]
    for (let x=robot.x+1;x<width;++x) {
        if (map[tuple(x,robot.y)]=='O') {
            objects=objects.toSpliced(0,0,{x:x,y:robot.y})
        }
        else if (!map[tuple(x,robot.y)]) {
            break
        }
        else if (map[tuple(x,robot.y)]=='#') {
            return false
        }
    }
    for (let obj of objects) {
        map[tuple(obj.x,obj.y)]=undefined
        map[tuple(obj.x+1,obj.y)]='O'
    }
    ++robot.x
}
const pushRight=()=>{
    if (!map[tuple(robot.x-1,robot.y)]) {
        --robot.x
        return
    }
    let objects:any[]=[]
    for (let x=robot.x-1;x>=0;--x) {
        if (map[tuple(x,robot.y)]=='O') {
            objects=objects.toSpliced(0,0,{x:x,y:robot.y})
        }
        else if (!map[tuple(x,robot.y)]) {
            break
        }
        else if (map[tuple(x,robot.y)]=='#') {
            return false
        }
    }
    for (let obj of objects) {
        map[tuple(obj.x,obj.y)]=undefined
        map[tuple(obj.x-1,obj.y)]='O'
    }
    --robot.x
}
const pushDown=()=>{
    if (!map[tuple(robot.x,robot.y+1)]) {
        ++robot.y
        return
    }
    let objects:any[]=[]
    for (let y=robot.y+1;y<height;++y) {
        if (map[tuple(robot.x,y)]=='O') {
            objects=objects.toSpliced(0,0,{x:robot.x,y:y})
        }
        else if (!map[tuple(robot.x,y)]) {
            break
        }
        else if (map[tuple(robot.x,y)]=='#') {
            return false
        }
    }
    for (let obj of objects) {
        map[tuple(obj.x,obj.y)]=undefined
        map[tuple(obj.x,obj.y+1)]='O'
    }
    ++robot.y
}
const pushUp=()=>{
    if (!map[tuple(robot.x,robot.y-1)]) {
        --robot.y
        return
    }
    let objects:any[]=[]
    for (let y=robot.y-1;y>=0;--y) {
        if (map[tuple(robot.x,y)]=='O') {
            objects=objects.toSpliced(0,0,{x:robot.x,y:y})
        }
        else if (!map[tuple(robot.x,y)]) {
            break
        }
        else if (map[tuple(robot.x,y)]=='#') {
            return false
        }
    }
    for (let obj of objects) {
        map[tuple(obj.x,obj.y)]=undefined
        map[tuple(obj.x,obj.y-1)]='O'
    }
    --robot.y
}
for (let row of ops) {
    for (let op of row) {
        let xp=0
        let yp=0
        switch (op) {
            case '>': pushLeft(); break
            case '<': pushRight(); break
            case 'v': pushDown(); break
            case '^': pushUp(); break
        }
        // console.log(op)
        // dump()
    }
}
const calc=()=>{
    let sum=0
    for (let y=0;y<height;++y) {
        for (let x=0;x<width;++x) {
            if (map[tuple(x,y)]=='O') {
                sum+=(100*y)+x
            }
        }
    }
    return sum
}
// dump()
console.log(`A: ${calc()}`)

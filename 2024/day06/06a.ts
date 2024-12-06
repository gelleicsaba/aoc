import { input } from './06data'
// import cloneDeep from 'clonedeep'
const test=
`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`
const _input = input.replaceAll("\r","").split("\n")
// const _input = test.replaceAll("\r","").split("\n")
let m:string[][]
m = _input.map((v)=>v.split(''))
// console.log(m)
let px=-1
let py=-1
let dir='u'
for (let y=0;y<m.length;++y) {
    for (let x=0;x<m[y].length;++x) {
        if (m[y][x]!='.'&&m[y][x]!='#') {
            px=x
            py=y
            switch (m[py][px]) {
                case '^': dir='u';break;
                case '>': dir='r';break;
                case 'v': dir='d';break;
                case '<': dir='l';break;
            }
            break
        }
    }
}
m[py][px]='.'
const next = {'u':'r', 'r':'d', 'd':'l', 'l':'u' }
const DONE=1,OK=2,TURN=3
const check = (_px: number, _py: number): number => {
    if (_px<0 || _px>=m[0].length || _py<0 || _py>=m.length) {
        return DONE
    }
    return (m[_py][_px]!='#') ? OK : TURN
}
// let n=0
// const dump = () => {
//     const signs = {'u':'^', 'r':'>', 'd':'v', 'l':'<' }
//     console.log(`=============================================================================`)
//     console.log(`${n}.  dir:${dir}  pos:${px},${py}`)
//     console.log(`=============================================================================`)
//     const _m = cloneDeep(m)
//     _m[py][px] = signs[dir]
//     for (let y=0;y<_m.length;++y) {
//         console.log(_m[y].join(''))
//     }
// }
while (px>=0 && px<m[0].length && py>=0 && py<m.length) {
    m[py][px]='X'
    // dump()
    if (dir=='u') {
        const tmp=check(px,py-1)
        if (tmp==OK) {
            --py
        } else if (tmp==TURN) {
            dir=next[dir]
        } else {
            break
        }
    } else if (dir=='d') {
        const tmp=check(px,py+1)
        if (tmp==OK) {
            ++py
        } else if (tmp==TURN) {
            dir=next[dir]
        } else {
            break
        }
    } else if (dir=='l') {
        const tmp=check(px-1,py)
        if (tmp==OK) {
            --px
        } else if (tmp==TURN) {
            dir=next[dir]
        } else {
            break
        }
    } else if (dir=='r') {
        const tmp=check(px+1,py)
        if (tmp==OK) {
            ++px
        } else if (tmp==TURN) {
            dir=next[dir]
        } else {
            break
        }
    }
    // ++n
    // if (n==15) break
}
const getVisits = () => {
    let sum=0
    for (let y=0;y<m.length;++y) {
        sum += m[y].filter((v)=>v=="X").length
    }
    return sum
}
console.log(`A: ${getVisits()}`)
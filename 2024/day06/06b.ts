import { input } from './06data'
import { tuple } from '../lib/aoclib'
import cloneDeep from 'clonedeep'
const DEBUG=false
// const test=
// `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`
//const _input = test.replaceAll("\r","").split("\n")
const _input = input.replaceAll("\r","").split("\n")
let _m:string[][]
_m = _input.map((v)=>v.split(''))
let _px=-1
let _py=-1
let _dir='u'
for (let y=0;y<_m.length;++y) {
    for (let x=0;x<_m[y].length;++x) {
        if (_m[y][x]!='.'&&_m[y][x]!='#') {
            _px=x
            _py=y
            switch (_m[_py][_px]) {
                case '^': _dir='u';break;
                case '>': _dir='r';break;
                case 'v': _dir='d';break;
                case '<': _dir='l';break;
            }
            break
        }
    }
}
_m[_py][_px]='.'
const next = {'u':'r', 'r':'d', 'd':'l', 'l':'u' }
const routeSign = {'u':'|', 'r':'-', 'd':'|', 'l':'-', 'x': '+'}
const DONE=1,OK=2,TURN=3
const getCommand = (_m_: string[][], x: number, y: number): number => {
    if (x<0 || x>=_m_[0].length || y<0 || y>=_m_.length) {
        return DONE
    }
    return (_m_[y][x]=='#' || _m_[y][x]=='O') ? TURN : OK
}
let n=0
const exam = (obsX: number, obsY: number): boolean => {
    const dump = () => {
        if (!DEBUG) return
        const signs = {'u':'^', 'r':'>', 'd':'v', 'l':'<' }
        console.log(`=============================================================================`)
        console.log(`${n}.  dir:${dir}  pos:${px},${py}`)
        console.log(`=============================================================================`)
        const clone = cloneDeep(m)
        clone[py][px] = clone[py][px]!='X'?signs[dir]:clone[py][px]
        for (let y=0;y<clone.length;++y) {
            console.log(clone[y].join(''))
        }
    }
    let m = cloneDeep(_m), px=_px, py=_py, dir=_dir, turns = {}, move=true
    m[obsY][obsX] = 'O'
    while (px>=0 && px<m[0].length && py>=0 && py<m.length) {
        if (m[py][px] == '.') {
            m[py][px]=routeSign[dir]
        } else if ( (m[py][px] == '|' && routeSign[dir]=='-') || (m[py][px] == '-' && routeSign[dir]=='|') ) {
            m[py][px]=routeSign['x']
        }
        if (dir=='u') {
            const command=getCommand(m,px,py-1)
            if (command==OK) {
                move=true
                --py
            } else if (command==TURN) {
                if (move && turns[tuple(px,py)]!==undefined) {
                    m[py][px]='X'
                    dump()
                    return true
                }
                turns[tuple(px,py)]=1
                m[py][px]=routeSign['x']
                dir=next[dir]
                move=false
            } else {
                return false
            }
        } else if (dir=='d') {
            const command=getCommand(m,px,py+1)
            if (command==OK) {
                move=true
                ++py
            } else if (command==TURN) {
                if (move && turns[tuple(px,py)]!==undefined) {
                    m[py][px]='X'
                    dump()
                    return true
                }
                turns[tuple(px,py)]=1
                m[py][px]=routeSign['x']
                dir=next[dir]
                move=false
            } else {
                return false
            }
        } else if (dir=='l') {
            const command=getCommand(m,px-1,py)
            if (command==OK) {
                move=true
                --px
            } else if (command==TURN) {
                if (move && turns[tuple(px,py)]!==undefined) {
                    m[py][px]='X'
                    dump()
                    return true
                }
                turns[tuple(px,py)]=1
                m[py][px]=routeSign['x']
                dir=next[dir]
                move=false
            } else {
                return false
            }
        } else if (dir=='r') {
            const command=getCommand(m,px+1,py)
            if (command==OK) {
                move=true
                ++px
            } else if (command==TURN) {
                if (move && turns[tuple(px,py)]!==undefined) {
                    m[py][px]='X'
                    dump()
                    return true
                }
                turns[tuple(px,py)]=1
                m[py][px]=routeSign['x']
                dir=next[dir]
                move=false
            } else {
                return false
            }
        }
        if (DEBUG) ++n
    }
    return false
}
let sum=0
let progress=0
for (let x=0;x<_m[0].length;++x) {
    for (let y=0;y<_m.length;++y) {
        if (x==_px && y==_py) continue
        if (_m[y][x]!='#') {
            sum+=exam(x,y)?1:0
        }
        ++progress
        if (progress%500==0) {
            process.stdout.write(".")
        }
    }
}
process.stdout.write("DONE\n")
console.log(`B: ${sum}`)

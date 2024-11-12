export {}
import { input } from './02data'

const test =
`ULL
RRDDD
LURDL
UUUUD`

const _input = input.replaceAll(" ","").replaceAll("\r","").split("\n")
//const _input = test.replaceAll(" ","").replaceAll("\r","").split("\n")


const pad = [[1,2,3], [4,5,6], [7,8,9]]
let pos = {x:1, y:1}

const move = (cmd: string) => {
    switch (cmd) {
        case 'U':
            --pos.y
            if (pos.y<0) {
                pos.y=0
            }
            break
        case 'D':
            ++pos.y
            if (pos.y>2) {
                pos.y=2
            }
            break
        case 'L':
            --pos.x
            if (pos.x<0) {
                pos.x=0
            }
            break
        case 'R':
            ++pos.x
            if (pos.x>2) {
                pos.x=2
            }
            break
    }
}

let result=""
for (let cmd of _input) {
    for (let p=0; p<cmd.length; ++p) {
        move(cmd.charAt(p))
    }
    result += pad[pos.y][pos.x].toString()
}
console.log("A:",result)


const padB =
`.......
...1...
..234..
.56789.
..ABC..
...D...
.......`
    .replaceAll("\r","").split("\n")


pos = {x:1, y:3}

const moveB = (cmd: string) => {
    switch (cmd) {
        case 'U':
            --pos.y
            if (padB[pos.y].charAt(pos.x)=='.') {
                ++pos.y
            }
            break
        case 'D':
            ++pos.y
            if (padB[pos.y].charAt(pos.x)=='.') {
                --pos.y
            }
            break
        case 'L':
            --pos.x
            if (padB[pos.y].charAt(pos.x)=='.') {
                ++pos.x
            }
            break
        case 'R':
            ++pos.x
            if (padB[pos.y].charAt(pos.x)=='.') {
                --pos.x
            }
            break
    }
}

result=""
for (let cmd of _input) {
    for (let p=0; p<cmd.length; ++p) {
        moveB(cmd.charAt(p))
    }
    result += padB[pos.y].charAt(pos.x)
}
console.log("B:",result)


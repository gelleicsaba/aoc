export {}

import { input } from './18data'
import cloneDeep from 'clone-deep'

const test =
`.#.#.#
...##.
#....#
..#...
#.#..#
####..`


const _input = input.replaceAll("\r","").split("\n")
//const _input = test.replaceAll("\r","").split("\n")

let grid: string[][] = []
for (let y=0; y<_input.length; ++y) {
    let dim = Array(_input[y].length)
    grid.push(dim)
    for (let x=0; x<_input[y].length; ++x) {
        grid[y][x] = _input[y].charAt(x)
    }
}
const backup = cloneDeep(grid)

const numOfNeighbours = (_grid: string[][], _x: number, _y: number): number => {
    let sum=0
    for (let a=-1; a<=1; ++a) {
        for (let b=-1; b<=1; ++b) {
            if (a==0 && b==0) {
                continue
            }
            let px=_x + b
            let py=_y + a
            if (px>=0 && px<grid.length && py>=0 && py < grid.length) {
                if (_grid[py][px]=='#') {
                    ++sum
                }
            }
        }
    }
    return sum
}

const prn = (title: string, _grid: string[][]) => {
    console.log(title)
    let sb=""
    for (let y=0; y<_grid.length; ++y) {
        for (let x=0; x<_grid.length; ++x) {
            sb+=_grid[y][x]
        }
        sb+="\n"
    }
    console.log(sb)
}


//prn("Initial", grid)

//const STEPS = 4
//const STEPS = 5
const STEPS = 100

const calc = (typ: string) => {
    for (let z=0; z<STEPS; ++z) {

        let _grid = cloneDeep(grid)

        for (let y=0; y<grid.length; ++y) {
            for (let x=0; x<grid.length; ++x) {

                let nbr = 0
                if (typ=='B') {
                    _grid[0][0]="#"
                    _grid[0][_grid.length-1]="#"
                    _grid[_grid.length-1][0]="#"
                    _grid[_grid.length-1][_grid.length-1]="#"
                }
                nbr = numOfNeighbours(grid, x, y)

                if (grid[y][x] == '#') {
                    if (nbr == 2 || nbr == 3) {
                        _grid[y][x] = '#'
                    } else {
                        _grid[y][x] = '.'
                    }
                } else {
                    if (nbr == 3) {
                        _grid[y][x] = '#'
                    } else {
                        _grid[y][x] = '.'
                    }
                }

            }
        }

        if (typ=='B') {
            _grid[0][0]="#"
            _grid[0][_grid.length-1]="#"
            _grid[_grid.length-1][0]="#"
            _grid[_grid.length-1][_grid.length-1]="#"
        }

        //prn(`Step ${z+1}`, _grid)
        grid = _grid
    }
}


let sumA = 0
calc('A')
for (let y=0; y<grid.length; ++y) {
    for (let x=0; x<grid.length; ++x) {
        if (grid[y][x]=='#') {
            ++sumA
        }
    }
}
console.log("A: ", sumA)

grid = backup

let sumB = 0
calc('B')
for (let y=0; y<grid.length; ++y) {
    for (let x=0; x<grid.length; ++x) {
        if (grid[y][x]=='#') {
            ++sumB
        }
    }
}
console.log("B: ", sumB)


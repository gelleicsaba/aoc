export {}
import { readInput } from '../lib/aoclib'
import cloneDeep from '../node_modules/clonedeep'
const inputText = readInput('./input.txt')
// const inputText = readInput('./exampleInput.txt')
let map: string[][] = []
for (let input of inputText.split('\n')) {
    if (input === '') {
        continue
    }
    map.push(input.split(''))
}
let forkLifts = cloneDeep(map)
const checkValidForklift = (y: number, x: number): boolean => {
    if (map[y][x] !== '@') {
        return false
    }
    const neighbors = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
    let rolls = 0;
    for (let neighbor of neighbors) {
        let xp = x + neighbor[1]
        let yp = y + neighbor[0]
        if (xp < 0 || xp >= map[0].length || yp < 0 || yp >= map.length) {
            continue
        }
        if (map[yp][xp] === '@') {
            ++ rolls;
        }
    }
    return rolls < 4
}
let result = 0
while (true) {
    let hasMore = false
    for (let y=0; y<map.length; ++y) {
        for (let x=0; x<map[0].length; ++x) {
            if (checkValidForklift(y, x)) {
                forkLifts[y][x] = '.'
                ++ result
                hasMore = true
            }
        }
    }
    map = cloneDeep(forkLifts)
    if (! hasMore) {
        break;
    }
}
console.log(result)

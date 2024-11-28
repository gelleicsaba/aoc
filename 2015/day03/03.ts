import { input } from './03data'

class Pos {
    x: number
    y: number
    constructor(_x: number, _y: number) {
        this.x = _x
        this.y = _y
    }
}

// santa houses
let houses: Array<Pos> = []
// santa + robo houses
let housesB: Array<Pos> = []

// santa pos
let x = 0
let y = 0

// robo pos
let x2 = 0
let y2 = 0

// santa only
const putHouse = (_x: number, _y: number) => {
    const find = houses.filter(q => q.x == x && q.y == y)
    if (find.length == 0) {
        houses.push(new Pos(_x, _y))
    }
}
const moveAndPut = (ch: string) => {
    switch (ch.charAt(0)) {
        case '^': --y ;break
        case 'v': ++y ;break
        case '<': --x ;break
        case '>': ++x ;break
    }
    putHouse(x,y)
}


const putHouseB = (_x: number, _y: number) => {
    const find = housesB.filter(q => q.x == _x && q.y == _y)
    if (find.length == 0) {
        housesB.push(new Pos(_x, _y))
    }
}
// santa and robo
const moveAndPutB = (ch: string, ch2: string) => {
    switch (ch.charAt(0)) {
        case '^': --y ;break
        case 'v': ++y ;break
        case '<': --x ;break
        case '>': ++x ;break
    }
    putHouseB(x,y)
    switch (ch2.charAt(0)) {
        case '^': --y2 ;break
        case 'v': ++y2 ;break
        case '<': --x2 ;break
        case '>': ++x2 ;break
    }
    putHouseB(x2,y2)
}

// santa only steps
putHouse(x,y)
for (let i=0; i<input.length; ++i) {
    moveAndPut(input.charAt(i))
}

// robot & santa steps
x = y = 0
putHouseB(x,y)
putHouseB(x2,y2)
let i=0
while (i<input.length) {
    moveAndPutB(input.charAt(i), input.charAt(i+1))
    i+=2
}

console.log("A:",houses.length)

console.log("B:",housesB.length)






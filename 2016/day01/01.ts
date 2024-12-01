import { input } from './01data'

//const test = `R5, L5, R5, R3`
//const test = `L2, L2, L2, L2`
//const test = `R2, R2, R2, R2`
//const test = `R8, R4, R4, R8`

const _input = input.replaceAll(" ","").split(",")
//const _input = test.replaceAll(" ","").split(",")

let pos = { x: 0, y: 0, angle: 'N'}

let places = Array(0)
let firstLoc: any = undefined

for (let cmd of _input) {
    const dir = cmd.charAt(0)
    const steps = parseInt(cmd.replace("L","").replace("R",""))
    console.log(`${dir} ${steps}`)

    if (dir == "R") {
        if (pos.angle == 'N') {
            pos.angle = 'E'
        } else if (pos.angle == 'E') {
            pos.angle = 'S'
        } else if (pos.angle == 'S') {
            pos.angle = 'W'
        } else if (pos.angle == 'W') {
            pos.angle = 'N'
        }
    } else if (dir == "L") {
        if (pos.angle == 'N') {
            pos.angle = 'W'
        } else if (pos.angle == 'W') {
            pos.angle = 'S'
        } else if (pos.angle == 'S') {
            pos.angle = 'E'
        } else if (pos.angle == 'E') {
            pos.angle = 'N'
        }
    }
    const pre = {x:pos.x, y:pos.y}
    switch (pos.angle) {
        case "E":
            pos.x += steps
            if (! firstLoc) {
                for (let f=0; f<steps; ++f) {
                    const found = places.filter(q => (q.x == pre.x+f && q.y == pre.y))
                    if (found.length==0) {
                        places.push({x:pre.x+f, y:pre.y})
                    } else {
                        firstLoc={x:pre.x+f, y:pre.y}
                        break
                    }
                }
            }
            break;
        case "W":
            pos.x -= steps
            if (! firstLoc) {
                for (let f=0; f<steps; ++f) {
                    const found = places.filter(q => (q.x == pre.x-f && q.y == pre.y))
                    if (found.length==0) {
                        places.push({x:pre.x-f, y:pre.y})
                    } else {
                        firstLoc={x:pre.x-f, y:pre.y}
                        break
                    }
                }
            }
            break;
        case "N":
            pos.y += steps
            if (! firstLoc) {
                for (let f=0; f<steps; ++f) {
                    const found = places.filter(q => (q.x == pre.x && q.y == pre.y+f))
                    if (found.length==0) {
                        places.push({x:pre.x, y:pre.y+f})
                    } else {
                        firstLoc={x:pre.x, y:pre.y+f}
                        break
                    }
                }
            }
            break;
        case "S":
            pos.y -= steps
            if (! firstLoc) {
                for (let f=0; f<steps; ++f) {
                    const found = places.filter(q => (q.x == pre.x && q.y == pre.y-f))
                    if (found.length==0) {
                        places.push({x:pre.x, y:pre.y-f})
                    } else {
                        firstLoc={x:pre.x, y:pre.y-f}
                        break
                    }
                }
            }
            break;
    }
    console.log(pos)
}
let result = Math.abs(pos.x) + Math.abs(pos.y)
console.log("A: ", result)
result = Math.abs(firstLoc.x) + Math.abs(firstLoc.y)
console.log("B: ", result)


//R8, R4, R4, R8









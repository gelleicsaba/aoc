export {}
import { input } from "./06data"
let leds: Array<any> = Array(1000)
for (let x=0; x<1000; ++x) {
    leds[x] = Array(1000)
    for (let y=0; y<1000; ++y) {
        leds[x][y] = false
    }
}
const toggleLed = (x: number, y: number) => {
    leds[y][x] = !leds[y][x]
}
const switchLed = (x: number, y: number, val: boolean) => {
    leds[y][x] = val
}
const throughToggle = (fx: number, fy: number, tx: number, ty: number) => {
    if (fx > tx) {
        const tmp = tx
        tx = fx
        fx = tmp
    }
    if (fy > ty) {
        const tmp = ty
        ty = fy
        fy = tmp
    }
    for (let y = fy; y <= ty; ++y) {
        for (let x = fx; x <= tx; ++x) {
            toggleLed(x, y)
        }
    }
}
const throughSwitch = (fx: number, fy: number, tx: number, ty: number, val: boolean) => {
    if (fx > tx) {
        const tmp = tx
        tx = fx
        fx = tmp
    }
    if (fy > ty) {
        const tmp = ty
        ty = fy
        fy = tmp
    }
    for (let y = fy; y <= ty; ++y) {
        for (let x = fx; x <= tx; ++x) {
            switchLed(x, y, val)
        }
    }
}

const _inputs = input.replaceAll("\r","").split("\n")

const process = (typ: string) => {
    for (let t of _inputs) {
        const _t = t.split(" ")
        let _from: string[] = []
        let _to: string[] = []
        if (_t[0]+_t[1] == "turnon") {
            _from = _t[2].split(",")
            _to = _t[4].split(",")
            //console.log("turnon",_from, _to)

            if (typ=='A') {
                throughSwitch(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]), true)
            } else if (typ=='B') {
                throughSwitchB(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]), true)
            }

        } else if (_t[0]+_t[1] == "turnoff") {
            _from = _t[2].split(",")
            _to = _t[4].split(",")
            //console.log("turnoff",_from, _to)
            if (typ=='A') {
                throughSwitch(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]), false)
            } else if (typ=='B') {
                throughSwitchB(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]), false)
            }

        } else if (_t[0] == "toggle") {
            _from = _t[1].split(",")
            _to = _t[3].split(",")
            //console.log("toggle",_from, _to)
            if (typ=='A') {
                throughToggle(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]))
            } else if (typ=='B') {
                throughToggleB(parseInt(_from[0]), parseInt(_from[1]), parseInt(_to[0]), parseInt(_to[1]))
            }
        } else {
            console.log("ERROR")
            break
        }
    }
}

process('A')

let ledNum = 0
for (let x=0; x<1000; ++x) {
    for (let y=0; y<1000; ++y) {
        if (leds[y][x]) {
            ++ledNum
        }
    }
}

console.log("A: ", ledNum)

const toggleLedB = (x: number, y: number) => {
    leds[y][x] += 2
}
const switchLedB = (x: number, y: number, val: boolean) => {
    leds[y][x] += val ? 1 : -1
    if (leds[y][x] < 0) {
        leds[y][x] = 0
    }
}

const throughToggleB = (fx: number, fy: number, tx: number, ty: number) => {
    if (fx > tx) {
        const tmp = tx
        tx = fx
        fx = tmp
    }
    if (fy > ty) {
        const tmp = ty
        ty = fy
        fy = tmp
    }
    for (let y = fy; y <= ty; ++y) {
        for (let x = fx; x <= tx; ++x) {
            toggleLedB(x, y)
        }
    }
}
const throughSwitchB = (fx: number, fy: number, tx: number, ty: number, val: boolean) => {
    if (fx > tx) {
        const tmp = tx
        tx = fx
        fx = tmp
    }
    if (fy > ty) {
        const tmp = ty
        ty = fy
        fy = tmp
    }
    for (let y = fy; y <= ty; ++y) {
        for (let x = fx; x <= tx; ++x) {
            switchLedB(x, y, val)
        }
    }
}

leds = Array(1000)
for (let x=0; x<1000; ++x) {
    leds[x] = Array(1000)
    for (let y=0; y<1000; ++y) {
        leds[x][y] = 0
    }
}

process('B')

ledNum = 0
for (let x=0; x<1000; ++x) {
    for (let y=0; y<1000; ++y) {
        ledNum += leds[y][x]
    }
}

console.log("B: ", ledNum)










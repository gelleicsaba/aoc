export {}
import { input } from './03data'

const testA =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`


//let _input = testA.replaceAll("\r","").split("\n")
let _input = input.replaceAll("\r","").split("\n")


const init = () => {
    const sz = _input[0].length
    let sb=''
    for (let x=0; x < sz; ++x ) {
        sb+='.'
    }
    _input.splice( 0, 0, sb )
    _input.push(sb)
    for (let x=0; x<_input.length; ++x) {
        _input[x] = `.${_input[x]}.`
    }
}

const NONSYM = ".0123456789"
const hasSym = (x: number, y: number): boolean => {
    if (
        !NONSYM.includes(_input[y].charAt(x-1)) ||
        !NONSYM.includes(_input[y].charAt(x+1)) ||

        !NONSYM.includes(_input[y+1].charAt(x)) ||
        !NONSYM.includes(_input[y-1].charAt(x)) ||

        !NONSYM.includes(_input[y+1].charAt(x+1)) ||
        !NONSYM.includes(_input[y+1].charAt(x-1)) ||

        !NONSYM.includes(_input[y-1].charAt(x+1)) ||
        !NONSYM.includes(_input[y-1].charAt(x-1)) )
    {
        return true
    }
    return false;

}

let result = 0
const NUM = "0123456789"
const calc = () => {
    for (let y = 1; y < _input.length-1; ++y) {
        let mode = false
        let num = ""
        let hasSymbol = false
        for (let x = 1; x < _input[y].length-1; ++x) {
            if (!mode && NUM.includes(_input[y].charAt(x))) {
                mode = true
            } else if (mode && !NUM.includes(_input[y].charAt(x)))  {
                if (hasSymbol) {
                    result += parseInt(num)
                }
                mode = false
                num = ""
                hasSymbol = false
            }
            if (mode) {
                num += _input[y].charAt(x)
                hasSymbol = hasSymbol || hasSym(x,y)
                // if this is a last character
                if (x == _input[y].length-2) {
                    if (hasSymbol) {
                        result += parseInt(num)
                    }
                }

            }
        }
    }
}

init()
calc()
console.log("A: ",result)


const testB =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

//_input = testB.replaceAll("\r","").split("\n")
_input = input.replaceAll("\r","").split("\n")
init()

result = 0
const hasgear = (_x: number, _y: number): boolean => {
    for (let y = -1; y <= 1; ++y) {
        for (let x = -1; x <= 1; ++x) {
            if (!(x==0 && y==0)) {
                if (_input[y+_y].charAt(x+_x)=="*") {
                    return true
                }
            }
        }
    }
    return false
}

// put numbers and positions
let grnums = Array(0)
let grs = Array(0)
for (let y = 1; y < _input.length-1; ++y) {
    let mode = false
    let num = ""
    let coords = Array(0)
    let hasAGear = false
    for (let x = 1; x < _input[y].length-1; ++x) {
        if (_input[y].charAt(x) == '*') {
            grs.push([x,y])
        }
        if (!mode && NUM.includes(_input[y].charAt(x))) {
            mode = true
        } else if (mode && !NUM.includes(_input[y].charAt(x)))  {
            if (hasAGear) {
                grnums.push([parseInt(num), num.length, coords])
            }
            mode = false
            num = ""
            hasAGear = false
            coords = Array(0)
        }
        if (mode) {
            num += _input[y].charAt(x)
            coords.push([x,y])
            hasAGear = hasAGear || hasgear(x,y)
            // if this is a last character
            if (x == _input[y].length-2) {
                if (hasAGear) {
                    grnums.push([parseInt(num), num.length, coords])
                }
            }

        }
    }
}
const hasGear = (x: number, y: number, num: any ): boolean => {
    for (let cr of num[2]) {
        if (cr[0]==x && cr[1]==y) {
            return true
        }
    }
    return false
}


const pairs = {}
for (let g = 0; g < grs.length; ++g) {
    console.log("g:",g)
    const gear = grs[g]
    for (let a = 0; a < grnums.length; ++a) {
        for (let b = 0; b < grnums.length; ++b) {
            if (a==b) continue
            if (pairs[`${a}|${b}`] || pairs[`${b}|${a}`]) continue
            const an = grnums[a]
            const bn = grnums[b]
            const grx = gear[0]
            const gry = gear[1]
            const anb =
                hasGear(grx-1, gry-1, an) ||
                hasGear(grx, gry-1, an) ||
                hasGear(grx+1, gry-1, an) ||

                hasGear(grx-1, gry, an) ||
                hasGear(grx+1, gry, an) ||

                hasGear(grx-1, gry+1, an) ||
                hasGear(grx, gry+1, an) ||
                hasGear(grx+1, gry+1, an)

            const bnb =
                hasGear(grx-1, gry-1, bn) ||
                hasGear(grx, gry-1, bn) ||
                hasGear(grx+1, gry-1, bn) ||

                hasGear(grx-1, gry, bn) ||
                hasGear(grx+1, gry, bn) ||

                hasGear(grx-1, gry+1, bn) ||
                hasGear(grx, gry+1, bn) ||
                hasGear(grx+1, gry+1, bn)

            if (anb && bnb) {
                result += an[0]*bn[0]
                pairs[`${a}|${b}`]=1
                pairs[`${b}|${a}`]=1
            }
        }
    }
    console.log(`g:${g}/${grs.length} result:${result}`)
}
console.log("B: ", result)


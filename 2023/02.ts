export {}
import { input } from "./02data"

const test =
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

//const _input = test.replaceAll(", ",",").replaceAll("; ",";").replaceAll(": ",":").replaceAll("\r","").split("\n")
let _input = input.replaceAll(", ",",").replaceAll("; ",";").replaceAll(": ",":").replaceAll("\r","").split("\n")

let psb = []
let result = 0
for (let x=0; x<_input.length; ++x) {
    const row = _input[x]
    const game = row.split(":")
    const gnum = parseInt((game[0].split(" "))[1])
    //console.log("game:",gnum)
    const sets = game[1].split(";")
    //console.log("\tsets:",sets)
    let possible = true
    for (const set of sets) {
        const cubes = set.split(",")
        //console.log("\t\tcubes:",cubes)
        const box = {}
        for (const cube of cubes) {
            const _cube = cube.split(" ")
            const cname = _cube[1]
            const cnum = parseInt(_cube[0])
            if (box[cname]) {
                box[cname] += cnum
            } else {
                box[cname] = cnum
            }
        }
        //console.log("\t\t\tbox:",box)
        //only 12 red cubes, 13 green cubes, and 14 blue cubes
        for (let key in box) {
            const value = box[key]
            switch (key) {
                case "red":
                    if (value > 12) {
                        possible=false
                        //console.log("\t\t\t\tred>12 :",value)
                    }

                    break;
                case "green":
                    if (value > 13) {
                        possible=false
                        //console.log("\t\t\t\tgreen>13 :",value)
                    }
                    break;
                case "blue":
                    if (value > 14) {
                        possible=false
                        //console.log("\t\t\t\tblue>14 :",value)
                    }
                    break;
            }
        }
    }
    //console.log("\tpossible:",possible)
    if (possible) {
        result += gnum
    }
}

console.log(`A: ${result}`)






//_input = test.replaceAll(", ",",").replaceAll("; ",";").replaceAll(": ",":").replaceAll("\r","").split("\n")
_input = input.replaceAll(", ",",").replaceAll("; ",";").replaceAll(": ",":").replaceAll("\r","").split("\n")

psb = []
result = 0
for (let x=0; x<_input.length; ++x) {
    const row = _input[x]
    const game = row.split(":")
    const gnum = parseInt((game[0].split(" "))[1])
    //console.log("game:",gnum)
    const sets = game[1].split(";")
    //console.log("\tsets:",sets)
    let boxes = Array(0)
    for (const set of sets) {
        const cubes = set.split(",")
        //console.log("\t\tcubes:",cubes)
        const box = {}
        for (const cube of cubes) {
            const _cube = cube.split(" ")
            const cname = _cube[1]
            const cnum = parseInt(_cube[0])
            if (box[cname]) {
                box[cname] += cnum
            } else {
                box[cname] = cnum
            }
        }
        //console.log("\t\t\tbox:",box)
        boxes.push(box)
    }
    //console.log("boxes",boxes)
    let mulboxes = Array(0)
    for (let box of boxes) {
        let r=box["red"]?box["red"]:0
        let b=box["green"]?box["green"]:0
        let g=box["blue"]?box["blue"]:0
        mulboxes.push([r,g,b])
    }
    //console.log("\t\t\tmulboxes:",mulboxes)
    let multiples = Array(0)
    for (let box1 of mulboxes) {
        //console.log("---")
        let r = box1[0]
        //console.log("\t\t\t\tR:"+r)
        for (let box2 of mulboxes) {

                let g = box2[1]
                //console.log("\t\t\t\tG:"+g)
                for (let box3 of mulboxes) {

                        let b = box3[2]
                        //console.log("\t\t\t\tB:"+b)
                        const mul = r*g*b
                        if (mul > 0) {
                            multiples.push(mul)
                        }

                }

        }
    }
    //console.log("\t\t\tmultiples:",multiples)
    let max = multiples[0]
    for (let num of multiples) {
        if (num > max) {
            max = num
        }
    }
    //console.log("\t\t\tmin:",max)
    result += max
}

console.log(`B: ${result}`)









export {}
import MD5 from 'crypto-js/md5'
const input = 'yzbqklnj'

let readyA = false
let readyB = false
let A = ""
let B = ""
console.log("Calculate")
for (let x = 0; x < 9999999; ++x) {
    const md5: string = MD5(input+x.toString()).toString()
    if (x%100000==0) {
        process.stdout.write(".")
    }
    if (!readyA && md5.startsWith("00000")) {
        A = x.toString()
        readyA = true
        process.stdout.write("A")
    }
    if (!readyB && md5.startsWith("000000")) {
        B = x.toString()
        readyB = true
        process.stdout.write("B")
    }
    if (readyA && readyB) {
        console.log()
        console.log("A:",A)
        console.log("B:",B)
        break
    }
}

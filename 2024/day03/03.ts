import { readInput } from '../lib/aoclib'
/// came from reggae build
// let input = readInput('./03testA.txt')
let input = readInput('./03data.txt')
const re = /mul\(([0-9]+),([0-9]+)\)/g
const resultA = [...input.matchAll(re)].map((x)=>parseInt(x[1])*parseInt(x[2])).reduce((total,x)=>(total+x))
console.log(`A: ${resultA}`)
// input = readInput('./03testB.txt')
input = input.replaceAll("do()","Ł").replaceAll("don't()","ł")
let input2=''
let _do=true
for (let x=0;x<input.length;++x) {
    if (input[x]=='Ł') {
        _do=true
    } else if (input[x]=='ł') {
        _do=false
    } else {
        input2+=_do?input[x]:''
    }
}
const resultB = [...input2.matchAll(re)].map((x)=>parseInt(x[1])*parseInt(x[2])).reduce((total,x)=>(total+x))
console.log(`B: ${resultB}`)

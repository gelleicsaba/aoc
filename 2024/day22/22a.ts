export {}
import { input } from './22data'
import { xor } from '../lib/aoclib'
const mutate=(s:string):number[]=>s.replaceAll("\r","").split("\n").map(v=>parseInt(v))
// const test=
// `1
// 10
// 100
// 2024`
// let _input=mutate(test)
const _input=mutate(input)
const prune=(v:number)=>v%16777216
const mix=(v:number,w:number)=>xor(v,w)
const mixNPrune=(v:number,w:number)=>prune(mix(v,w))
for (let y=0;y<_input.length;++y) {
    if (y%100==0) {
        process.stdout.write(`${y}.. `)
    }
    for (let x=0;x<2000;++x) {
        const num=_input[y]
        let s=mixNPrune(num*64,num)
        s=mixNPrune(Math.trunc(s/32),s)
        s=mixNPrune(s*2048,s)
        _input[y]=s
        // console.log(s)
    }
}
const sum=_input.reduce((a,b,i)=>a+b)
console.log(`\nA: ${sum}`)




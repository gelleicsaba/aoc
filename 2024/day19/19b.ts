export {}
import { input } from './19data'
import cloneDeep from 'clonedeep'
import { existFile, readObjFromFile, writeObjToFile } from '../lib/aoclib'
const VALID_INPUTS_FILE = './validInputs.txt'
const mutate=(s:string):string[]=>s.replaceAll("\r","").split("\n")
// const test=
// `r,b,g,br,gb,rb

// rrbgbr`
// const _input=mutate(test)

if (!existFile(VALID_INPUTS_FILE)) {
    console.log("THE 'validInputs.json' DOESN'T EXIST!")
    console.log("RUN THE '19a.ts' (TASK A) TO GET VALID INPUTS!")
    process.exit(0)
}
const _input=mutate(input)
let samples: string[]=[]
let towels: string[]=[]

const result19a:any=readObjFromFile(VALID_INPUTS_FILE)
towels=result19a.towels
samples=result19a.samples

let _samples:string[]=[]
let scores={}
let cache={}
const _build=(s:string, nodes:string[])=>{
    if (cache[s]) {
        for (let x of nodes) {
            scores[x]=scores[x]?scores[x]+cache[s]:cache[s]
        }
        return
    }
    for (let sample of _samples) {
        if (sample==s) {
            for (let x of nodes) {
                scores[x]=scores[x]?scores[x]+1:1
            }
        } else if (s.startsWith(sample)) {
            const tmp=s.substring(sample.length)
            const _nodes=cloneDeep(nodes)
            _nodes.push(tmp)
            _build(tmp,_nodes)
        }
    }
    if (! cache[s]) {
        cache[s]=scores[s]
    }
}
const build=(idx: number)=>{

    console.log(`build ${idx}.`)
    scores={}
    cache={}
    _samples=samples.filter(v=>towels[idx].includes(v))
    _build(towels[idx],[towels[idx]])
}
let sum=0
for (let x=0;x<towels.length;++x) {
    build(x)
    sum+=scores[towels[x]]
    console.log(`  ${x}: ${scores[towels[x]]}`)
}
console.log("DON'T FORGET!")
console.log("IF YOUR INPUT HAS CHANGED, RUN TASK A (19a.ts) AGAIN!!!\n")
console.log()
console.log(`B: ${sum}`)



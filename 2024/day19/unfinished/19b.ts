export {}
import { input } from '../19data'
import cloneDeep from 'clonedeep'
const mutate=(s:string):string[]=>s.replaceAll("\r","").split("\n")
// const test=
// `r,b,g,br,gb,rb

// rrbgbr`
// const _input=mutate(test)
const _input=mutate(input)
const samples=_input[0].split(',').map(v=>v.trim())
const towels: string[]=[]
for (let x=2;x<_input.length;++x) {
    towels.push(_input[x])
}
let scores={}
let cache={}
let _samples:string[]=[]
const _build=(s:string, nodes:string[])=>{
    if (cache[s]) {
        console.log(`found in cache '${s}': ${scores[s]}`)
        for (let x of nodes) {
            console.log(`scores[${x}] (${scores[x]}) += cache[${s}] (${cache[s]})`)
            scores[x]=scores[x]?scores[x]+cache[s]:cache[s]
        }
        return
    }
    for (let sample of _samples) {
        if (sample==s) {
            console.log(`Hurray, found a solution ${nodes}`)
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
    _build(towels[0],[towels[0]])
}
build(0)


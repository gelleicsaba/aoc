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
console.log("DON'T FORGET!")
console.log("REMOVE THE 'validInputs.json' IF YOUR INPUT HAS CHANGED!!!\n")
const _input=mutate(input)
const samples=_input[0].split(',').map(v=>v.trim())
let towels: string[]=[]
for (let x=2;x<_input.length;++x) {
    towels.push(_input[x])
}

let validTowels:string[]=[]
let currentTowel=""
let currentLen=0
let solutionResult=false
let currentSamples:string[]=[]
let currentSampleCache: any[]=[]
let calls=0
const findSolution=(startIdx: number)=>{
    ++calls
    for (let x of currentSampleCache[startIdx]) {
        if (x.length==0) continue
        if (solutionResult || calls>500000000) return
        if (startIdx+x.length==currentLen)
        {
            solutionResult=true
            return
        }
        findSolution(startIdx+x.length)
    }
}
let samplesMaxLen=0
for (let x=0;x<samples.length;++x) {
    if (samples[x].length>samplesMaxLen) {
        samplesMaxLen=samples[x].length
    }
}

if (!existFile(VALID_INPUTS_FILE)) {
    let currentTowelCache: any[]=[]
    for (let x=0;x<towels.length;++x) {
        process.stdout.write(`${x}..`)
        solutionResult=false
        currentTowel=towels[x]
        currentLen=towels[x].length
        currentSamples=samples.filter(q=>currentTowel.includes(q))
        currentTowelCache=[]
        for (let r=0;r<currentLen;++r) {
            let tmp: string[]=[]
            tmp.push('')
            for (let q=0;q<samplesMaxLen;++q) {
                if (r+q<=currentLen) {
                    tmp.push(currentTowel.substring(r,r+q+1))
                }
            }
            currentTowelCache.push(tmp)
        }
        currentSampleCache=Array(currentLen)
        for (let r=0;r<currentLen;++r) {
            currentSampleCache[r]=[]
            for (let sample of currentSamples) {
                if (r+sample.length<=currentLen &&
                    currentTowelCache[r][sample.length]==sample)
                {
                    currentSampleCache[r].push(sample)
                }
            }
        }
        calls=0
        findSolution(0)
        process.stdout.write(`(${solutionResult})  `)
        if (solutionResult) {
            validTowels.push(currentTowel)
        }
    }
    writeObjToFile(VALID_INPUTS_FILE, validTowels)
} else {
    console.log(`FOUND '${VALID_INPUTS_FILE}'. READ VALID INPUTS FROM THAT FILE.`)
    validTowels=readObjFromFile(VALID_INPUTS_FILE)
}
// process.exit(0)
towels=validTowels

let scores={}
let cache={}
let _samples:string[]=[]
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
console.log(`B: ${sum}`)



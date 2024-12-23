export {}
import { input } from './19data'
import { writeObjToFile } from '../lib/aoclib'
const VALID_INPUTS_FILE = './validInputs.txt'
const mutate=(s:string):string[]=>s.replaceAll("\r","").split("\n")
const _input=mutate(input)
const samples=_input[0].split(',').map(v=>v.trim()).sort((a,b)=>b.length-a.length)
const towels: string[]=[]
for (let x=2;x<_input.length;++x) {
    towels.push(_input[x])
}
let validTowels:string[]=[]
let currentTowel=""
let currentLen=0
let solutionResult=false
let currentSamples:string[]=[]
let calls=0
const findSolution=(startIdx: number)=>{
    ++calls
    for (let x of currentSampleCache[startIdx]) {
        if (x.length==0) continue
        if (solutionResult || calls>100) return
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
let sum=0
let currentTowelCache: any[]=[]
let currentSampleCache: any[]=[]
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
        ++sum
        validTowels.push(currentTowel)
    }
}
writeObjToFile(VALID_INPUTS_FILE, {samples: samples, towels: validTowels})
console.log()
console.log(`A: ${sum}`)


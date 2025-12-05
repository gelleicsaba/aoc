export {}
import { input } from "./17data"
import { xor } from '../lib/aoclib'
const mutate=(s:string)=>s.replaceAll("\r","").split("\n")
// const test=
// `Register A: 0
// Register B: 0
// Register C: 0

// Program: 0,3,5,4,3,0`
// const _input=mutate(test)
const _input=mutate(input)
let ax:number
let bx:number
let cx:number
let prg:number[]=[]
let output:number[]=[]
ax=parseInt(_input[0].split(':')[1].trim())
bx=parseInt(_input[1].split(':')[1].trim())
cx=parseInt(_input[2].split(':')[1].trim())
let ip=0
prg=_input[4].split(':')[1].trim().split(',').map(v=>parseInt(v))
const opValue=(op:number)=>{
    switch (op) {
        case 0: case 1: case 2: case 3: return op
        case 4: return ax
        case 5: return bx
        case 6: return cx
    }
    console.log('ERROR: invalid operandus')
    return -1
}


const pow2: number[]=Array(100)
for (let x=0;x<100;++x) {
    pow2[x]=Math.pow(2,x)
}
let op=0
const processInstruction=()=>{
    const instruction=prg[ip]
    switch (instruction) {
        case 0:
            switch (prg[ip+1]) {
                case 0: case 1: case 2: case 3: op=prg[ip+1]; break
                case 4: op=ax; break
                case 5: op=bx; break
                case 6: op=cx; break
            }
            ax=Math.trunc(ax/pow2[op])
            ip+=2
            break
        case 1:
            // bx=bx^prg[ip+1]
            bx=xor(bx,prg[ip+1])
            ip+=2
            break
        case 2:
            switch (prg[ip+1]) {
                case 0: case 1: case 2: case 3: op=prg[ip+1]; break
                case 4: op=ax; break
                case 5: op=bx; break
                case 6: op=cx; break
            }
            bx=(op%8)&0b111
            ip+=2
            break
        case 3:
            if(ax!=0) {
                ip=prg[ip+1]
            } else {
                ip+=2
            }
            break
        case 4:
            // ignore op
            // bx=bx^cx
            bx=xor(bx,cx)
            ip+=2
            break
        case 5:
            switch (prg[ip+1]) {
                case 0: case 1: case 2: case 3: op=prg[ip+1]; break
                case 4: op=ax; break
                case 5: op=bx; break
                case 6: op=cx; break
            }
            output.push(op%8)
            ip+=2
            break
        case 6:
            switch (prg[ip+1]) {
                case 0: case 1: case 2: case 3: op=prg[ip+1]; break
                case 4: op=ax; break
                case 5: op=bx; break
                case 6: op=cx; break
            }
            bx=Math.trunc(ax/pow2[op])
            ip+=2
            break
        case 7:
            switch (prg[ip+1]) {
                case 0: case 1: case 2: case 3: op=prg[ip+1]; break
                case 4: op=ax; break
                case 5: op=bx; break
                case 6: op=cx; break
            }
            cx=Math.trunc(ax/pow2[op])
            ip+=2
            break
        default:
            console.log('ERROR: invalid instruction')

    }
}
const state={B:bx,C:cx}
const reset=(_ax: number)=>{
    ax=_ax
    bx=state.B
    cx=state.C
    ip=0
    output=[]
}

let done=false
let initA=13948*1000000
while (!done) {
    if (initA%1000000==0) {
        process.stdout.write(`${initA/1000000} `)
    }
    reset(initA)
    while (ip<prg.length) {
        processInstruction()
        if (output.length>0 && output[output.length-1]!=prg[output.length-1]) {
            break
        }
    }
    done=output.length==prg.length && output.join(',')==prg.join(',')
    if (!done) ++initA
}
console.log()
console.log(`B: ${initA}`)

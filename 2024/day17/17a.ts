export {}
import { input } from "./17data"
const mutate=(s:string)=>s.replaceAll("\r","").split("\n")
// const test=
// `Register A: 2024
// Register B: 2024
// Register C: 43690

// Program: 4,0`
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
// (opcode 0)
const adv=(op:number)=>{
    ax=Math.trunc(ax/Math.pow(2,op))
    ip+=2
}
// (opcode 1)
const bxl=(op:number)=>{
    bx=bx^op
    ip+=2
}
// (opcode 2)
const bst=(op:number)=>{
    bx=(op%8)&0b111
    ip+=2
}
// (opcode 3)
const jnz=(op:number)=>{
    if(ax!=0) {
        ip=op
    } else {
        ip+=2
    }
}
// (opcode 4)
const bxc=(op:number)=>{
    // ignore op
    bx=bx^cx
    ip+=2
}
// (opcode 5)
const out=(op:number)=>{
    output.push(op%8)
    ip+=2
}
// (opcode 6)
const bdv=(op:number)=>{
    bx=Math.trunc(ax/Math.pow(2,op))
    ip+=2
}
// (opcode 7)
const cdv=(op:number)=>{
    cx=Math.trunc(ax/Math.pow(2,op))
    ip+=2
}
const process=()=>{
    const instruction=prg[ip]
    const op=opValue(prg[ip+1])
    const litOp=prg[ip+1]
    switch (instruction) {
        case 0:
            adv(op)
            break
        case 1:
            bxl(litOp)
            break
        case 2:
            bst(op)
            break
        case 3:
            jnz(litOp)
            break
        case 4:
            bxc(op)
            break
        case 5:
            out(op)
            break
        case 6:
            bdv(op)
            break
        case 7:
            cdv(op)
            break
        default:
            console.log('ERROR: invalid instruction')

    }
}
while (ip<prg.length) {
    process()
}
console.log(`A: ${output.join(',')}`)



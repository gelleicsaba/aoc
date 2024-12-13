export {}
import { input } from './13data'
const mutate=(s: string)=>(s+"\n")
    .replaceAll("Button A: X+","")
    .replaceAll("Button B: X+","")
    .replaceAll(" Y+","")
    .replaceAll("Prize: X=","")
    .replaceAll("Y=","")
    .replaceAll("\r","").split("\n")
const test=
`Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`
// const _input=mutate(test)
const _input=mutate(input)
let options: any[] = []
let n=0
let str=''
for (let row of _input) {
    if (n%4==0) {
        str=row+';'
    } if (n%4==1) {
        str+=row+';'
    } if (n%4==2) {
        str+=row
    } if (n%4==3) {
        const pars=str.split(';')
        const btnA=pars[0].split(',').map(v=>parseInt(v))
        const btnB=pars[1].split(',').map(v=>parseInt(v))
        const prize=pars[2].split(',').map(v=>parseInt(v))
        options.push({
            a:{ x:btnA[0], y:btnA[1] },
            b:{ x:btnB[0], y:btnB[1] },
            prize: { x: prize[0], y:prize[1]  }
        })
        str=''
    }
    ++n
}
const pushButtons=(op:any)=>{
    const ax=op.a.x
    const bx=op.b.x
    const ay=op.a.y
    const by=op.b.y
    const px=op.prize.x
    const py=op.prize.y
    let sumX=0
    let sumY=0
    let result={a:-1,b:-1,tokens:Number.MAX_VALUE}
    for (let a=0;a<100;++a) {
        for (let b=0;b<100;++b) {
            sumX=a*ax+b*bx
            sumY=a*ay+b*by
            if (sumX==px&&sumY==py) {
                const tokens=a*3+b
                if (tokens < result.tokens) {
                    result={a:a,b:b,tokens:tokens}
                }
            }
        }
    }
    return result
}
let sum=0
for (let op of options) {
    const pb = pushButtons(op)
    if (pb.a!=-1 && pb.b!=-1) {
        sum+=pb.tokens
    }
}
console.log(`A: ${sum}`)

import { input } from './09data'
// const _input=`2333133121414131402`.split('')
const _input=input
let num: string[]=[]
let n=0
let x=0
while (x<_input.length) {
    if (x+1<_input.length) {
        const f=parseInt(_input[x])
        const s=parseInt(_input[x+1])
        for (let y=0;y<f;++y) {
            num.push(`${n}`)
        }
        for (let y=0;y<s;++y) {
            num.push('.')
        }
        ++n
        x+=2
    } else {
        const f=parseInt(_input[x])
        for (let y=0;y<f;++y) {
            num.push(`${n}`)
        }
        break
    }
}
num.push('-')
// const dump = () => {
//     console.log(num.join('|'))
// }
const eat=()=>{
    const end=num.indexOf('-')-1
    const tmp=num[end]
    const pos=num.indexOf('.')
    if (pos===-1) {
        return false
    }
    num[end]='-'
    num[pos]=tmp
    return true
}
while (eat()) {}
num=num.slice(0,num.indexOf('-'))
n=0
let sum=num.map((v)=>parseInt(v)*n++).reduce((v,total)=>total+v)
console.log(`A: ${sum}`)

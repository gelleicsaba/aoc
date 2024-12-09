import { input } from './09data'

// test cases
// const _input=`2333133121414131402`.split('')
// const _input=`102410233131`.split('')

// production
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
// const dump = () => {
//     console.log(num.join('|'))
//     let sb=''
//     for (let x=1;x<idx;++x) {
//         sb+='  '
//     }
//     console.log(sb+'^')
//     console.log(idx)
// }
let idx=num.length
const move=()=>{
    const end=idx
    const ch=num[end-1]
    let x=end-2
    while (x>0 && num[x]==ch) --x
    const block=x+1
    let n=0
    for (let x=0;x<block;++x) {
        if (num[x]=='.') {
            ++n
        } else {
            n=0
        }
        if (n==end - block) {
            for (let y=0;y<n;++y) {
                num[x-y]=ch
                num[block+y]='.'
            }
            idx=block
            while (num[idx]=='.') --idx
            ++idx
            return true
        }
    }
    let y=block-1
    while (num[y]==ch || num[y]=='.') {
        --y
    }
    idx=y+1
    return false
}
while (idx>1) {
    move()
}
n=0
let sum=num.map((v)=>(v!='.'?parseInt(v):0)*n++).reduce((v,total)=>total+v)
console.log(`B: ${sum}`)

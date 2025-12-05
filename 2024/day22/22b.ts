export {}
import { input } from './22data'
import { xor } from '../lib/aoclib'
const mutate=(s:string):number[]=>s.replaceAll("\r","").split("\n").map(v=>parseInt(v))
// const test=
// `123`
const test=
`1
2
3
2024`
let _input=mutate(test)
// const _input=mutate(input)
const prune=(v:number)=>v%16777216
const mix=(v:number,w:number)=>xor(v,w)
const mixNPrune=(v:number,w:number)=>prune(mix(v,w))
let results2:any[][]=[]
let results:any[][]=[]
for (let y=0;y<_input.length;++y) {
    // if (y%100==0) {
    //     process.stdout.write(`${y}.. `)
    // }
    const nums:number[]=[]
    nums.push(_input[y]%10)
    for (let x=0;x<2000;++x) {
        const num=_input[y]
        let s=mixNPrune(num*64,num)
        s=mixNPrune(Math.trunc(s/32),s)
        s=mixNPrune(s*2048,s)
        _input[y]=s
        nums.push(_input[y]%10)
        // console.log(_input[y]%10)
    }
    const nums2:number[]=[]
    nums2.push(nums[0])
    for (let t=1;t<nums.length;++t) {
        nums2.push(nums[t]-nums[t-1])
    }
    const maxVal=Math.max.apply(null,nums)
    console.log(maxVal)
    results.push(nums2)
    results2.push(nums)

    for (let x=0;x<nums2.length-4;++x) {
        if (
            y==0 &&
            nums2[x]==-2 &&
            nums2[x+1]==1 &&
            nums2[x+2]==-1 &&
            nums2[x+3]==3
        ) {
            console.log(`Found in ${x}`)
            break
        }
    }


}

//console.log(JSON.stringify(results[0]))
const dump=(y:number,a:number,b:number)=>{
    let s=''
    let s2=''
    for (let x=a;x<b;++x) {
        s+=x>0?`,${results2[y][x]}(${results[y][x]}) `:`${results2[y][x]}(${results[y][x]}) `
    }
    console.log(`${s2}\n${s}`)
}
dump(0,1957,1970)



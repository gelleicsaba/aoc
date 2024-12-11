export {}
const input=`0 5601550 3914 852 50706 68 6 645371`
// const input=`125 17`
let _input=input.split(' ')
let _d={}
for (let x=0;x<_input.length;++x) {
    _d[_input[x]]=_d[_input[x]]?_d[_input[x]]+1:1
}
const calculate=(d:any,blink: number)=>{
    for (let x=0;x<blink;++x) {
        let d2={}
        for (let key in d) {
            const val=d[key]
            if (key=='0') {
                d2['1']=d2['1']?d2['1']+val:val
            } else if (key.length%2==0) {
                const a=parseInt(key.slice(0,Math.trunc(key.length/2)))
                const b=parseInt(key.slice(Math.trunc(key.length/2)))
                d2[a]=d2[a]?d2[a]+val:val
                d2[b]=d2[b]?d2[b]+val:val
            } else {
                const a=parseInt(key)*2024
                d2[a]=d2[a]?d2[a]+val:val
            }
        }
        d=d2
    }
    let sum=0
    for (let key in d) {
        sum+=d[key]
    }
    return [sum,blink<50?d:{}]
}
let sum:number
[sum,_d] = calculate(_d,25)
console.log(`A: ${sum}`)
let _d2:{}
[sum,_d2] = calculate(_d,50)
console.log(`B: ${sum}`)

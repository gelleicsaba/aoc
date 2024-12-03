import { input } from './01data'
import cloneDeep from 'clonedeep'
const mutate = (v: string) => v.replaceAll("\r","").replaceAll("   ", ",").split("\n")
// const test =
// `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`
// const _input = mutate(test)
const _input = mutate(input)
let lis: any[] = []
lis=_input.map((v) => {
    const tmp = v.split(',')
    return [parseInt(tmp[0]), parseInt(tmp[1])]
})
const clone=cloneDeep(lis)
let sum = 0
let done=false
while (!done) {
    let min1=Number.MAX_VALUE
    let min2=Number.MAX_VALUE
    let minPos1=-1
    let minPos2=-1
    for (let x=0;x<lis.length;++x) {
        if (lis[x][0]<min1 && lis[x][0]>0) {
            min1=lis[x][0]
            minPos1=x
        }
        if (lis[x][1]<min2 && lis[x][1]>0) {
            min2=lis[x][1]
            minPos2=x
        }
    }
    done = minPos1<0
    if (!done) {
        lis[minPos1][0]=0
        lis[minPos2][1]=0
        sum+=Math.abs(min2-min1)
    }
}
console.log(`A: ${sum}`)
/////////////////////////////////////////////////////////////////////////
lis=clone
sum = 0
for (let x=0;x<lis.length;++x) {
    let ml=0
    for (let y=0;y<lis.length;++y) {
        if (lis[y][1]==lis[x][0]) {
            ++ml
        }
    }
    if (ml>0) {
        sum+=lis[x][0]*ml
    }
}
console.log(`B: ${sum}`)


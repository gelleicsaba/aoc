export {}
const input = 33100000

let found=-1
let lim: number[] = Array(1000000)
for (let x=1; x<lim.length; ++x) {
    lim[x] = 0
}
for (let x=1; x<1000000; ++x) {
    let sum=0
    for (let y=1; y<=x; ++y) {
        if (lim[y] < 50 && x % y == 0) {
            ++lim[y]
            sum += 11*y
        }
    }
    if (x%10000==0) {
        console.log(`house:${x}  gifts:${sum}  remains:${input-sum}`)
    }
    if (sum>=input) {
        found=x
        break;
    }
}
console.log(`B: ${found}`)


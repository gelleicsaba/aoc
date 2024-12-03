import MD5 from 'crypto-js/md5'
const input=`uqwqemis`
// const test=`abc`
// const _intput=test
const _intput=input
let n=0
const taskA = () => {
    let rs=''
    for (let x=0; x<Number.MAX_VALUE; ++x) {
        const str = MD5(_intput+(x.toString()) ).toString()
        if (str.startsWith('00000')) {
            ++n
            process.stdout.write(n.toString())
            rs+=str[5]
            if (n==8) {
                break
            }
        }
        if (x%200000==0) {
            process.stdout.write(".")
        }
    }
    console.log("\n")
    console.log(`A: ${rs}`)
    console.log("\n")
}
const replaceAt = (str: string, index: number, replacement: string) =>
    str.substring(0, index) + replacement + str.substring(index + replacement.length)
const taskB = () => {
    let rs="________"
    for (let x=0; x<Number.MAX_VALUE; ++x) {
        const str = MD5(_intput+(x.toString()) ).toString()
        if (str.startsWith('00000')) {
            const pos=str[5]>='0'&&str[5]<='7'?parseInt(str[5]):-1
            const ch=str[6]
            if (pos==-1 || rs[pos]!='_') {
                process.stdout.write('S')
            } else {
                rs = replaceAt(rs,pos,ch)
                if (rs.indexOf('_')==-1) {
                    break
                } else {
                    process.stdout.write(`[${rs}]`)
                }
            }
        }
        if (x%200000==0) {
            process.stdout.write(".")
        }
    }
    console.log("\n")
    console.log(`B: ${rs}`)
    console.log("\n")
}

taskA()
taskB()


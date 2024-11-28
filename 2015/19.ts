import { input, medicine } from "./19data"

/*
const test =
`H => HO
H => OH
O => HH`
*/
//const testMedicine = `HOH`
//const testMedicine = `HOHOHO`
//const _input = test.replaceAll("\r","").split("\n")
//const _medicine = testMedicine

const _input = input.replaceAll("\r","").split("\n")
const _medicine = medicine

const rps: any[] = []

for (let x of _input) {
    rps.push({from: x.split(" => ")[0].trim(), to: x.split(" => ")[1].trim() })
}

const mols = {}
for (let rp of rps) {
    for (let x=0; x<_medicine.length; ++x) {
        let good=true
        for (let y=0; y<rp.from.length; ++y) {
            if (y+x>=_medicine.length) {
                good=false
                break
            }
            if (rp.from.charAt(y) != _medicine.charAt(x+y)) {
                good=false
                break
            }
        }
        if (good) {
            let tmp: string[] = _medicine.split('')
            tmp = tmp.toSpliced(x, 0, '<')
            tmp = tmp.toSpliced(x + rp.from.length+1 , 0, '>')
            let updated = tmp.join('').replace(`<${rp.from}>`, rp.to)
            mols[updated] = updated
        }
    }
}
console.log(`A: ${Object.keys(mols).length}`)


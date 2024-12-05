import { input } from './05data'
const mutate = (v: string): string[] => v.replaceAll("\r","").split("\n")
const test=
`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`
// const _input = mutate(test)
const _input = mutate(input)
let rules: string[] = []
let updates: any[] = []
let typ=0
for (let str of _input) {
    const sp = str.split(',')
    if (str.trim().length==0) {
        typ=1
        continue
    }
    if (typ==0) {
        rules.push(str.trim())
    } else {
        updates.push(sp.map((v)=>parseInt(v)))
    }
}
const taskA = (): any[] => {
    let _sum=0
    let _invalidUpdates: any[] = []
    for (let y=0;y<updates.length;++y) {
        let validRule = true
        for (let x=0;x<updates[y].length-1;++x) {
            const hasRule = rules.filter((v) => v == `${updates[y][x]}|${updates[y][x+1]}`).length > 0
            if (!hasRule) {
                validRule=false
                break
            }
            const hasInvalidRule = rules.filter((v) => v == `${updates[y][x+1]}|${updates[y][x]}`).length > 0
            if (hasInvalidRule) {
                validRule=false
                break
            }
        }
        if (validRule) {
            _sum+=updates[y][((updates[y].length+1)/2)-1]
        } else {
            _invalidUpdates.push(updates[y])
        }
    }
    return [_sum, _invalidUpdates]
}
const taskB = (_invalidUpdates: any[]) :number => {
    let _sum=0
    for (let y=0;y<_invalidUpdates.length;++y) {
        for (let x=0;x<_invalidUpdates[y].length;++x) {
            // bubble sorting
            for (let x2=0;x2<_invalidUpdates[y].length-1;++x2) {
                if (x!=x2) {
                    const rule = rules.filter((v) => v == `${_invalidUpdates[y][x]}|${_invalidUpdates[y][x2]}`).length > 0
                    const ruleInv = rules.filter((v) => v == `${_invalidUpdates[y][x2]}|${_invalidUpdates[y][x]}`).length > 0
                    if (! rule && ruleInv) {
                        const tmp = _invalidUpdates[y][x]
                        _invalidUpdates[y][x] = _invalidUpdates[y][x2]
                        _invalidUpdates[y][x2] = tmp
                    }
                }
            }
        }
        _sum+=_invalidUpdates[y][((_invalidUpdates[y].length+1)/2)-1]
    }
    return _sum
}
let sum: number
let invalidUpdates: any[]
[sum, invalidUpdates] = taskA()
console.log(`A: ${sum}`)
console.log(`B: ${taskB(invalidUpdates)}`)

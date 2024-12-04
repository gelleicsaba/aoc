import shop from './21shop'
const input=
`Hit Points: 100
Damage: 8
Armor: 2`
let tmp_bossHit=0
let tmp_bossDam=0
let tmp_bossArm=0
for (let t of input.replaceAll("\r","").split("\n")) {
    const sp=t.split(':')
    switch (sp[0]) {
        case "Hit Points":
            tmp_bossHit=parseInt(sp[1].trim())
            break
        case "Damage":
            tmp_bossDam=parseInt(sp[1].trim())
            break
        case "Armor":
            tmp_bossArm=parseInt(sp[1].trim())
            break
    }
}
const bossHit=tmp_bossHit
const bossDam=tmp_bossDam
const bossArm=tmp_bossArm
const plHit=100
const script = (dam: number, arm: number): boolean => {
    let _bossHit = bossHit
    let _plHit = plHit
    let plTurn = true
    while (_bossHit>0 && _plHit>0) {
        if (plTurn) {
            _bossHit -= dam - bossArm > 0 ? dam - bossArm : 1
        } else {
            _plHit -= bossDam - arm > 0 ? bossDam - arm : 1
        }
        plTurn=!plTurn
    }
    return _plHit > 0 && _bossHit <= 0
}
let winCosts: number[] = []
let looseCosts: number[] = []
for (let w=0;w<shop.weapons.length;++w) {
    for (let a=0;a<shop.armors.length;++a) {
        for (let r1=0;r1<shop.rings.length;++r1) {
            for (let r2=0;r2<shop.rings.length;++r2) {
                if (r1 != r2) {
                    const weapon = shop.weapons[w]
                    const armor = shop.armors[a]
                    const ring1 = shop.rings[r1]
                    const ring2 = shop.rings[r2]
                    const dam = weapon.dam + armor.dam + ring1.dam + ring2.dam
                    const arm = armor.arm + weapon.arm + ring1.arm + ring2.arm
                    const costs = weapon.cost + armor.cost + ring1.cost + ring2.cost
                    let plWin = script(dam, arm)
                    if (plWin) {
                        winCosts.push(costs)
                    } else {
                        looseCosts.push(costs)
                    }
                }
            }
        }
    }
}
console.log(`A: ${Math.min.apply(null, winCosts)}`)
console.log(`B: ${Math.max.apply(null, looseCosts)}`)

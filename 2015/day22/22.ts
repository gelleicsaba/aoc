/*
    Magic Missile costs 53 mana. It instantly does 4 damage.
    Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
    Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
    Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
    Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.
*/
const spells =
[
    {name:"Magic Missile", costs: 53, dam: 4, heals: 0, armor: 0, effect: false, lasts: 0, mana: 0 },
    {name:"Drain", costs: 73, dam: 2, heals: 2, armor: 0, effect: false, lasts: 0, mana: 0 },
    {name:"Shield", costs: 113, dam: 0, heals: 0, armor: 7, effect: true, lasts: 6, mana: 0},
    {name:"Poison", costs: 173, dam: 3, heals: 0, armor: 0, effect: true, lasts: 6, mana: 0},
    {name:"Recharge", costs: 229, dam: 0, heals: 0, armor: 0, effect: true, lasts: 5, mana: 101 },
    {name:"(NONE)", costs: 0, dam: 0, heals: 0, armor: 0, effect: false, lasts: 0, mana: 0 },
]
const input=
`Hit Points: 58
Damage: 9`
let player = {
    INITIAL_HP: 50,
    hp: 50,
    INITIAL_MANA: 500,
    mana: 500,
    INITIAL_ARMOR: 0,
    armor: 0,
    spent: 0,
    effects: { "Shield": 0, "Poison": 0, "Recharge": 0}
}
let boss = {
    INITIAL_HP: parseInt(input.replaceAll("\r","").split("\n")[0].split(':')[1].trim()),
    hp: 0,
    DAMAGE: parseInt(input.replaceAll("\r","").split("\n")[1].split(':')[1].trim()),
}

const applyTestSuite = (id: number) => {
    if (id==1) {
        player.hp = 10
        player.mana = 250
        player.armor = 0
        player.spent = 0
        player.effects["Shield"]=0
        player.effects["Poison"]=0
        player.effects["Recharge"]=0
        boss.hp = 13
        boss.DAMAGE = 8
        player['script'] = [
            "Poison", "Magic Missile"
        ]
        player['scriptIndex'] = 0
    } else if (id==2) {
        player.hp = 10
        player.mana = 250
        player.armor = 0
        player.spent = 0
        player.effects["Shield"]=0
        player.effects["Poison"]=0
        player.effects["Recharge"]=0
        boss.hp = 14
        boss.DAMAGE = 8
        player['script'] = [
            "Recharge", "Shield", "Drain", "Poison", "Magic Missile",
        ]
        player['scriptIndex'] = 0
    }
}

const taskA = (testInject?: Function) => {
    // let step=''
    let cycles = 0
    let win = false
    let manaMin = Number.MAX_SAFE_INTEGER
    let stepsMax = 0
    const shieldSpell = spells.filter(q => q.name == "Shield")[0]
    const poisonSpell = spells.filter(q => q.name == "Poison")[0]
    const rechargeSpell = spells.filter(q => q.name == "Recharge")[0]
    const noneSpell = spells.filter(q => q.name == "(NONE)")[0]
    let done = false
    let debug = false
    let steps = 0
    while (true) {
        win = false
        while (! win) {
            player.hp = player.INITIAL_HP
            player.armor = player.INITIAL_ARMOR
            player.mana = player.INITIAL_MANA
            player.spent = 0
            player.effects["Shield"]=0
            player.effects["Poison"]=0
            player.effects["Recharge"]=0
            boss.hp = boss.INITIAL_HP
            win = false

            if (testInject!==undefined) {
                testInject()
                done=true
                debug=true
            }
            let playerTurn = true
            let spell: any
            steps=0
            // step=''
            while (player.hp>0 && player.mana>0 && boss.hp>0) {
                if (playerTurn) {
                    let x = Math.round(Math.random()*4)
                    spell = spells[x]
                    if (spell.effect && player.effects[spell.name]>0) {
                        continue
                    }
                    if (player.mana > 53 && player.mana < spell.costs) {
                        continue
                    }
                    if (player['script']!==undefined) {
                        spell=spells.filter(v=>v.name==player['script'][player['scriptIndex']])[0]
                        ++player['scriptIndex']
                    }

                    if (debug) console.log()
                    if (debug) console.log(`-- Player turn --`)
                    if (debug) console.log(`- Player has ${player.hp} hit points, ${player.armor} armor, ${player.mana} mana`)
                    if (debug) console.log(`- Boss has ${boss.hp} hit points`)

                    if (spell.name != "Recharge" && player.effects["Recharge"]>0) {
                        player.mana += rechargeSpell.mana
                        --player.effects["Recharge"]
                        if (debug) console.log(`Recharge provides ${rechargeSpell.mana} mana; its timer is now ${player.effects["Recharge"]}.`)
                    }
                    if (player.mana < 53) {
                        win = false
                        break
                    }
                    if (spell.effect) {

                        if (player.mana >= spell.costs) {
                            player.mana -= spell.costs
                            player.spent += spell.costs
                        } else {
                            spell = noneSpell
                        }

                        player.effects[spell.name] = spell.lasts
                        if (spell.name=="Shield") {
                            if (debug) console.log(`Player casts Shield (${spell.costs} mana), increasing armor by ${shieldSpell.armor}.`)
                        } else if (spell.name=="Poison") {
                            if (debug) console.log(`Player casts Poison (${spell.costs} mana).`)
                        } else if (spell.name=="Recharge") {
                            if (debug) console.log(`Player casts Recharge (${spell.costs} mana).`)
                        }
                    }

                    if (spell.name != "Shield" && player.effects["Shield"]>0) {
                        player.armor = shieldSpell.armor
                        --player.effects["Shield"]
                        if (debug) console.log(`Shield's timer is now ${player.effects["Shield"]}.`)
                    }
                    if (spell.name != "Poison" && player.effects["Poison"]>0) {
                        boss.hp -= poisonSpell.dam
                        --player.effects["Poison"]
                        if (debug) console.log(`Poison deals ${poisonSpell.dam} damage; its timer is now ${player.effects["Poison"]}..`)
                        if (boss.hp <= 0) {
                            win = true
                            if (debug) console.log(`This kills the boss, and the player wins.`)
                            break
                        }
                    }

                    if (!spell.effect) {
                        if (player.mana >= spell.costs) {
                            player.mana -= spell.costs
                            player.spent += spell.costs
                        } else {
                            spell = noneSpell
                        }

                        if (spell.name=="Drain") {
                            if (debug) console.log(`Player casts Drain (${spell.costs} mana), dealing ${spell.dam} damage, and healing ${spell.heals} hit points.`)
                        } else if (spell.name=="Magic Missile") {
                            if (debug) console.log(`Player casts Magic Missile (${spell.costs} mana), dealing ${spell.dam} damage.`)
                        }
                        player.hp += spell.heals
                        boss.hp -= spell.dam
                        if (boss.hp <= 0) {
                            win = true
                            if (debug) console.log(`This kills the boss, and the player wins.`)
                            break
                        }
                    }
                    ++steps
                } else {
                    if (debug) console.log()
                    if (debug) console.log(`-- Boss turn --`)
                    if (debug) console.log(`- Player has ${player.hp} hit points, ${player.armor} armor, ${player.mana} mana`)
                    if (debug) console.log(`- Boss has ${boss.hp} hit points`)

                    if (player.effects["Shield"]>0) {
                        player.armor = shieldSpell.armor
                        --player.effects["Shield"]
                        if (debug) console.log(`Shield's timer is now ${player.effects["Shield"]}.`)
                    }
                    if (player.effects["Poison"]>0) {
                        boss.hp -= poisonSpell.dam
                        --player.effects["Poison"]
                        if (debug) console.log(`Poison deals ${poisonSpell.dam} damage; its timer is now ${player.effects["Poison"]}..`)
                        if (boss.hp <= 0) {
                            win = true
                            if (debug) console.log(`This kills the boss, and the player wins.`)
                            break
                        }
                    }
                    if (player.effects["Recharge"]>0) {
                        player.mana += rechargeSpell.mana
                        --player.effects["Recharge"]
                        if (debug) console.log(`Recharge provides ${rechargeSpell.mana} mana; its timer is now ${player.effects["Recharge"]}.`)
                    }

                    let bossDam = boss.DAMAGE - player.armor > 0 ? boss.DAMAGE - player.armor : 1
                    if (debug) console.log(`Boss attacks for ${boss.DAMAGE}-${player.armor} (${bossDam}) damage.`)
                    player.hp -= bossDam
                    // if (debug) console.log(`Player hp: ${player.hp} `)
                    if (player.hp <= 0) {
                        win = false
                        if (debug) console.log(`Boss has killed the player. The boss wins.`)
                        break
                    }
                }
                if (debug) console.log(`   Player ${player.hp} : Boss ${boss.hp}    Player casts: ${player.spent} mana`)
                playerTurn=!playerTurn
            }
            if (debug) console.log(`Pl ${player.hp}  |  Boss ${boss.hp}   Player won: ${win}   Player casts: ${player.spent}`)

            if (done) break

        }

        ++ cycles
        if (player.spent < manaMin) {
            manaMin = player.spent
            console.log (`Current min value: ${manaMin}   Number of cycles: ${cycles}`)
        }
        if (steps > stepsMax) {
            stepsMax = steps
            console.log (`Current max steps: ${stepsMax}   (Player casts: ${player.spent})`)
        }

        if (cycles % 100000==0) {
            console.log (`Current min value: ${manaMin}   Number of cycles: ${cycles}`)
        }
        if (done) break

    }
}

// console.log("===== TEST SUITE 1 ===============================================")
// taskA(() => applyTestSuite(1))
// console.log()
// console.log()
// console.log()
// console.log("===== TEST SUITE 2 ===============================================")
// taskA(() => applyTestSuite(2))

taskA()

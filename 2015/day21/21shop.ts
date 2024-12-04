const weapons =
`Weapons:  Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0`
const armors =
`Armor:    Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5`
const rings =
`Rings:   Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3`
class Shop {
    public weapons: any[] = []
    public armors: any[] = []
    public rings: any[] = []
    constructor () {
        let __weapons = weapons
        let __armors = armors+"\nNONE 0 0 0"
        let __rings = rings+"\nNONE 0 0 0"
        for (let x=0;x<12;++x) {
            __weapons = __weapons.replaceAll("  "," ")
            __armors = __armors.replaceAll("  "," ")
            __rings = __rings.replaceAll("  "," ")
        }
        __rings = __rings.replaceAll(" +","+")
        const _weapons = __weapons.replaceAll("\r","").split("\n")
        const _armors = __armors.replaceAll("\r","").split("\n")
        const _rings = __rings.replaceAll("\r","").split("\n")
        let f=true
        for (let t of _weapons) {
            if (f) {
                f=false
                continue
            }
            const sp = t.split(" ")
            this.weapons.push({name: sp[0], cost: parseInt(sp[1]), dam: parseInt(sp[2]), arm: parseInt(sp[3]) })
        }
        f=true
        for (let t of _armors) {
            if (f) {
                f=false
                continue
            }
            const sp = t.split(" ")
            this.armors.push({name: sp[0], cost: parseInt(sp[1]), dam: parseInt(sp[2]), arm: parseInt(sp[3]) })
        }
        f=true
        for (let t of _rings) {
            if (f) {
                f=false
                continue
            }
            const sp = t.split(" ")
            this.rings.push({name: sp[0], cost: parseInt(sp[1]), dam: parseInt(sp[2]), arm: parseInt(sp[3]) })
        }
    }
}
export default new Shop()
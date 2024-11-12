export {}
import { input } from './09data'

const test =
`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`

const _inputs = input.replaceAll("\r","").split("\n")
//const _inputs = test.replaceAll("\r","").split("\n")

const conns: any[] = []
const cities: any[] = []
const cityroutes: any[] = []

for (let x=0; x<_inputs.length; ++x) {
    const row = _inputs[x].trim()
    const parts = row.split(" ")
    const from = parts[0].trim()
    const to = parts[2].trim()
    const km = parseInt(parts[4].trim())

    if (cities[from]) {
        cities[from].push([to,km])
    } else {
        cities[from] = [to,km]
    }
    if (cities[to]) {
        cities[to].push(from,km)
    } else {
        cities[to] = [from,km]
    }
    conns.push([from, to])
}
console.log(cities)

import { input } from './05data'

let _inputs: Array<string> = input.replaceAll("\r","").split("\n")
const nbChars: Array<string> = ["ab", "cd", "pq", "xy"]

const isVowel = (c :string) => {
    switch (c.charAt(0)) { case 'a': case 'e': case 'i': case 'o': case 'u': return true; }
    return false
}

const isNice = (str: string) => {
    let vw = 0
    let dl = false
    let nbc = false

    for (let x = 0; x < str.length; ++x) {
        const c = str.charAt(x)
        if (isVowel(c)) {
            ++vw
        }
        if (x > 0) {
            if (!dl && c == str.charAt(x-1)) {
                dl = true
            }
            if (! nbc) {
                const d = str.charAt(x-1) + str.charAt(x)
                const find = nbChars.filter(q => q == d)
                if (find.length > 0) {
                    nbc = true
                    //console.log("QQ " + find)
                }
            }
        }
    }
    return vw>2 && dl && !nbc
}

let nice = 0
for (let s of _inputs) {
    if (isNice(s)) {
        ++nice
    }
}

console.log("A: ",nice)

const overlap = (str: string) => {
    for (let x = 0; x < str.length-1; ++x) {
        const d = str.charAt(x) + str.charAt(x+1)
        for (let y = 0; y < str.length-1; ++y) {
            if (y == x || y == x+1 || y == x-1) {
                continue
            }
            const d2 = str.charAt(y) + str.charAt(y+1)
            if (d == d2) {
                //console.log("found ", d)
                return true
            }
        }
    }
    return false
}
const repeatLetters = (str: string) => {
    for (let x = 0; x < str.length-2; ++x) {
        if (str.charAt(x) == str.charAt(x+2)) {
            //console.log(`found ${str.charAt(x)}${str.charAt(x+1)}${str.charAt(x+2)}`)
            return true
        }
    }
}

nice = 0
for (let s of _inputs) {
    if (overlap(s) && repeatLetters(s)) {
        ++nice
    }
}
console.log("B: ",nice)

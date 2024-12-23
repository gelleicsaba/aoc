export {}
import { input } from './19data'
const mutate=(s:string):string[]=>s.replaceAll("\r","").split("\n")
// const test=
// `rrgwru, gwubwg, wgbbw, bwb, ugrgw, uwgguuw, wuggb, bgwb, ubrr, grruuub, rwbwgbub, wwwggg, uuw, gubuu, urwb, bubg, bubb, rruruuu, ubgr, uw, urugg, wubuu, brwb, buw, bgug, wgbwwrb, rwrgrr, gwgr, rrwrg, wwbwgbw, gguu, rgg, bwg, ruurrwg, wbu, ggg, wrw, brbw, wbb, rrbgg, gbb, gwwrubwu, rwgu, grgwwu, wguu, rwg, wbwug, rbur, gwg, wbrugu, wbwwgu, wbbuw, rwrg, rgru, rgb, bwwrg, bwur, rrubwu, gwb, ugwur, wbguwb, rbu, ubrwgw, ruwbr, wbbu, rrbwbg, rgub, rwgb, urwg, bbw, bugg, rugwg, rwbrwww, wuru, guu, brwbg, ug, ruuwruw, bguww, wwrgrurg, rrbgr, uubwurb, brrrwgg, bur, urg, rbg, wruw, gr, ugb, wwrbgrg, wbuuw, bbugu, uug, rrbb, rrbw, bgr, wwwru, rgu, urr, rg, wbgbru, brrgu, gubu, rurgr, wwbrgg, ruurwgwg, rbb, rbrugwb, gwwrbg, bwuuwrg, wu, b, bgwrb, uwggr, rgbb, rww, wgwb, gwgwr, uwbb, uww, gu, ubwuu, wbwwwug, rurwru, rr, rrg, uggr, bgwu, wbgbu, urggw, br, gubgugr, wgrb, bbgrrbu, brbg, wrg, bgrb, rwbwwur, uwr, bubu, grwb, ubb, wr, bbbgwr, bug, uwgwuwu, grb, bgw, uuu, ugr, wgbbgu, gbg, bgwub, urbgrw, rbruwg, gb, bbwgwur, uwbgwrr, ggrb, wbrrwrbu, gbbugrb, ub, rwb, gwr, ruwu, gurgu, rru, uuwwgwuw, bw, ruwbbb, rbgrgu, wuwu, grrugr, wgr, rbbr, rugr, rrrrbww, bwrr, wrbbr, uuwgr, gug, wwb, rgur, brbrr, gguw, grwubrg, rrrr, uwb, wuwwrrwg, gwbggr, rwrub, wuur, gub, rbgb, urrbubrr, uwubu, brbb, bwbr, bww, ruuubwu, ugbbbr, bub, rrug, wub, gruu, uu, bbu, gbbr, urrg, buwu, grw, grbbbu, bgb, ugubg, uwww, urw, wwubruww, buurb, www, bguurr, wwgu, wgb, ruwub, wggggbg, urrb, gbwuw, ubrrg, wrr, gbubgg, gw, wuw, wuug, wwrb, wgg, rgugrru, rgwrbr, guurrg, bgu, rurgb, gwggb, bwgbbw, ggwb, ubwgw, bbg, rbr, wgru, urwr, brr, rgbr, rgr, wwg, guwuru, uuggg, rrw, buu, urb, guwg, ugwwbuwb, rubb, brbuww, rwugru, ubu, wwub, bgwgb, wrug, rug, w, brgg, wwugwruw, ggrwb, bbwuwuu, uub, rrr, ggbrr, wbur, wurbru, wgu, brb, urbbb, gburbww, wbrgruru, rbugr, gubw, wgwgg, rwr, ugw, gggg, gwrwrg, rrub, gbwgg, grg, uwuur, gbwbbb, guw, gbwbb, uwu, ruw, bwr, rwgub, rbw, ggbwr, u, gwu, rrurrb, gwgg, uugwrbr, brw, ugburg, rwu, wwu, wbr, ruwgr, gbwbur, rwgr, rwbww, rbgr, rgbub, rbbuw, ruu, bwgw, bbwg, ubr, gurr, wwr, wwwguu, gbw, ggw, gru, wug, rubwrbrr, wbrrrr, uru, wbgw, wgur, uurgg, bbb, rbwgwbur, wwbwur, bbgubw, gww, brg, ugu, rgrgw, wwrrgugu, rrrwuww, uwwrb, wrb, rrgg, wubgrrb, bwwgrbww, gbr, gwrwu, brgwwbu, urrwub, rbru, bwrgrr, brwuwrb, guuur, wb, bbrb, brww, wuwrww, bu, rgw, rwbwug, bbug, urrgr, bg, bgg, wbgwbgru, wbrru, uwbbr, wbg, gwwur, gur, ubwb, gubbb, bb, wrugr, grur, rb, uwubrg, bwgrw, gbug, g, wuwubgw, ubw, urgu, rrrg, uwg, bbww, uwgrug, ww, ggu, gwbuwu, rgggwgr, wugw, gbrrg, ugg, bwu, ubuur, uurrw, uwwug, bgww, ubg, rw, gwgbwrg, wuu, rbgbg, buwbur, rub, ugbwwrgu, gbww, wbw, gurbwu, bruw, rggrbrgw, wguwu, ubwbwr, ru, uwur, ggb, uurwg, wguubgr, wru, rbrbr, rbwr, wwwrbb, urww, rur, bru, bbbwrw, uwrwrr, ruww, ububbgr, rrb, bggrwg, bbr, wrwrb, bwgwrbg, grbuwg, gg, ubuurwg, uur, guguwb, rugurgbw, bbuwbb

// wrbwgruugbbgwwurggwrgrrrurbgwbgggwbbgwgbrwggwur`
// const _input=mutate(test)
const _input=mutate(input)
const samples=_input[0].split(',').map(v=>v.trim()).sort((a,b)=>b.length-a.length)
const towels: string[]=[]
for (let x=2;x<_input.length;++x) {
    towels.push(_input[x])
}
let currentTowel=""
let currentLen=0
let solutionResult=false
let currentSamples:string[]=[]
let calls=0
const findSolution=(startIdx: number)=>{
    ++calls
    for (let x of currentSampleCache[startIdx]) {
        if (x.length==0) continue
        if (solutionResult || calls>500000000) return
        if (startIdx+x.length==currentLen)
        {
            solutionResult=true
            return
        }
        findSolution(startIdx+x.length)
    }
}
let samplesMaxLen=0
for (let x=0;x<samples.length;++x) {
    if (samples[x].length>samplesMaxLen) {
        samplesMaxLen=samples[x].length
    }
}
let sum=0
let currentTowelCache: any[]=[]
let currentSampleCache: any[]=[]
for (let x=0;x<towels.length;++x) {
    process.stdout.write(`${x}..`)
    solutionResult=false
    currentTowel=towels[x]
    currentLen=towels[x].length
    currentSamples=samples.filter(q=>currentTowel.includes(q))
    currentTowelCache=[]
    for (let r=0;r<currentLen;++r) {
        let tmp: string[]=[]
        tmp.push('')
        for (let q=0;q<samplesMaxLen;++q) {
            if (r+q<=currentLen) {
                tmp.push(currentTowel.substring(r,r+q+1))
            }
        }
        currentTowelCache.push(tmp)
    }
    currentSampleCache=Array(currentLen)
    for (let r=0;r<currentLen;++r) {
        currentSampleCache[r]=[]
        for (let sample of currentSamples) {
            if (r+sample.length<=currentLen &&
                currentTowelCache[r][sample.length]==sample)
            {
                currentSampleCache[r].push(sample)
            }
        }
    }
    calls=0
    findSolution(0)
    process.stdout.write(`(${solutionResult})  `)
    if (solutionResult) {
        ++sum
    }
}
console.log()
console.log(`A: ${sum}`)

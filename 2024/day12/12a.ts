export {}
import { input } from './12data'
import { tuple } from '../lib/aoclib'
const mutate=(x: string): any[]=>x.replaceAll("\r","").split("\n").map(v=>v.split(''))
const map=mutate(input)
const visits={}
const getPlotPoints=(x: number, y: number, ch: string, points: any[]): any[] => {
    if (x>=0 && x<=map[0].length && y>=0 && y<map.length && map[y][x]==ch && !visits[tuple(x,y)]) {
        visits[tuple(x,y)]=1
        points.push({x:x,y:y})
    } else {
        return points
    }
    points=getPlotPoints(x+1,y,ch,points)
    points=getPlotPoints(x-1,y,ch,points)
    points=getPlotPoints(x,y-1,ch,points)
    points=getPlotPoints(x,y+1,ch,points)
    return points
}
const getPerimeter=(points: any[])=>{
    const pointsDict={}
    for (let point of points) {
        pointsDict[tuple(point.x, point.y)]=point
    }
    let perimeterDict={}
    for (let key in pointsDict) {
        const d=pointsDict[key]
        const x=d.x
        const y=d.y
        if (!pointsDict[tuple(x-1,y)]) {
            perimeterDict[tuple(x-1,y)]= !perimeterDict[tuple(x-1,y)] ? 1:perimeterDict[tuple(x-1,y)]+1
        }
        if (!pointsDict[tuple(x+1,y)]) {
            perimeterDict[tuple(x+1,y)]= !perimeterDict[tuple(x+1,y)] ? 1:perimeterDict[tuple(x+1,y)]+1
        }
        if (!pointsDict[tuple(x,y+1)]) {
            perimeterDict[tuple(x,y+1)]= !perimeterDict[tuple(x,y+1)] ? 1:perimeterDict[tuple(x,y+1)]+1
        }
        if (!pointsDict[tuple(x,y-1)]) {
            perimeterDict[tuple(x,y-1)]= !perimeterDict[tuple(x,y-1)]?1 : perimeterDict[tuple(x,y-1)]+1
        }
    }
    let sum=0
    for (let key in perimeterDict) {
        sum+=perimeterDict[key]<4 ? perimeterDict[key] : 4
    }
    return sum
}
let sum=0
for (let y=0;y<map.length;++y) {
    for (let x=0;x<map[0].length;++x) {
        if (!visits[tuple(x,y)]) {
            const plotPoints=getPlotPoints(x,y,map[y][x],[])
            const area= plotPoints.length
            const perimeter= getPerimeter(plotPoints)
            sum+=area*perimeter
        }
    }
}
console.log(`A: ${sum}`)

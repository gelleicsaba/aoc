import fs from 'fs'

export const readInput = (filename: string): string => {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data
    } catch (err) {
        console.error(err);
    }
    return ''
}

export const tuple=(...args)=>`(${args.join(',')})`

export const permutations = (arr: any[]) => {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
    return arr.reduce(
        (acc, item, i) =>
        acc.concat(
            permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
            item,
            ...val,
            ])
        ),
        []
    )
}

export const tupleToArray=(s:string,mapFunc?: Function)=>
    mapFunc ? s.substring(1,s.length-1).split(',').map(v=>mapFunc(v))
        : s.substring(1,s.length-1).split(',')

export const xor=(b:number,c:number):number=>{
    let b_=b.toString(2).padStart(50,'0')
    let c_=c.toString(2).padStart(50,'0')
    let d=0
    let n=1
    for (let x=49;x>=0;--x) {
        if ((b_[x]=='0'&&c_[x]=='1')||(b_[x]=='1'&&c_[x]=='0')) d+=n
        n*=2
    }
    return d
}

export const searchAll=(str:string,w:string)=>{
    let regex = new RegExp(w, 'gi')
    let result:RegExpExecArray|null
    let indices: number[] = [];
    while ( (result = regex.exec(str)) ) {
        indices.push(result.index)
    }
    return indices
}


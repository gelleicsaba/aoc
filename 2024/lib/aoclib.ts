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

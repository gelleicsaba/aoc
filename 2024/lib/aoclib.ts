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

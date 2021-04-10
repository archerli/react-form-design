import { isNil } from 'lodash-es'

export function replaceNum(str) {
    if (!str) return str
    return str.replace(/\D/g, '')
}

export function replaceLimit(num, min, max) {
    let nextNum = parseFloat(num)
    if (isNaN(nextNum)) return num
    if (!isNil(min) && nextNum < min) nextNum = min
    if (!isNil(max) && nextNum > max) nextNum = max
    return nextNum
}
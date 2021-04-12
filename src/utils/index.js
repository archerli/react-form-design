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

export function findValidIndex(index, list) {
    let nextIndex = index - 1
    if (nextIndex < 0) nextIndex = index + 1
    if (nextIndex > list.length - 1) nextIndex = list.length - 1
    let nextItem = list[nextIndex]
    return nextItem
}
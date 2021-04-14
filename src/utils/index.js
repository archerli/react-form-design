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

// 列表删除元素时，找到下个可选中的元素
export function findValidItem(index, list) {
    let nextIndex = index - 1
    if (nextIndex < 0) nextIndex = index + 1
    if (nextIndex > list.length - 1) nextIndex = list.length - 1
    let nextItem = list[nextIndex]
    return nextItem
}

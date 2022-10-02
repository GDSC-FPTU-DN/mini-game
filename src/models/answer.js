export let answerMark = []

export function newRecord() {
    answerMark = []
}

export function increase(value) {
    answerMark.push(value)
}

export function decrease() {
    answerMark.pop()
}
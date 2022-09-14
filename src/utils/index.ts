export function range(start = 0, end: number = null): number[] {
    const list: number[] = []

    if (end === null) {
        start = 0;
        end = start;
    }

    for (let index = start; index < end; index++) {
        list.push(index)
    }

    return list
}

export function formatMonth(month: number = null, year: number = null): string {
    const date = new Date()

    if (month == null) month = date.getMonth() + 1
    if (year == null) year = date.getFullYear()

    return `${year}-${month}`
}

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

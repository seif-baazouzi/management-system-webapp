import type Block from "~/interfaces/block";

export const blockTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p"]

export default function parseNoteBody(body: string): Block[] {
    const blocks: Block[] = [];
    const lines = body.split("\n")

    for (const line of lines) {
        const [type, content] = parseLine(line)
        blocks.push({ type, content })
    }

    return blocks
}

function parseLine(line: string) {
    const index = line.indexOf(":")
    if (index === -1) return ["p", line]

    const element = line.substr(0, index)
    const value = line.substring(index + 1)

    if (blockTypes.indexOf(element.toLowerCase()) != -1) return [element, value]

    return ["p", line]
}
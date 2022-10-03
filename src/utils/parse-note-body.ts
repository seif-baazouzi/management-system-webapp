import type Block from "~/interfaces/block";

export const blockTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "img", "a"]

export default function parseLine(line: string): Block {
    const index = line.indexOf(":")
    if (index === -1) return { type: "p", content: line }

    const element = line.substring(0, index)
    const value = line.substring(index + 1)

    if (blockTypes.indexOf(element.toLowerCase()) != -1) return { type: element, content: value }

    return { type: "p", content: line }
}
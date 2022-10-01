<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { draggableBlock, draggedToBlock } from "~/store";
    import Block from "./Block.svelte";

    export let body: string;
    export let onChange: Function;

    $: lines = filterLines(body.split("\n"));

    beforeUpdate(() => {
        body = filterLines(lines).join("\n");
        onChange(body);
    });

    const filterLines = (lines: string[]): string[] =>
        lines.map((l) => l.trim()).filter((l) => l != "");

    draggedToBlock.subscribe((draggedToIndex) => {
        if (draggedToIndex != $draggableBlock) {
            const newLines: string[] = [];

            for (let i = 0; i < draggedToIndex; i++) {
                if (i != $draggableBlock) newLines.push(lines[i]);
            }

            if (draggedToIndex > $draggableBlock) {
                newLines.push(lines[draggedToIndex]);
                newLines.push(lines[$draggableBlock]);
            } else {
                newLines.push(lines[$draggableBlock]);
                newLines.push(lines[draggedToIndex]);
            }

            for (let i = draggedToIndex + 1; i < lines.length; i++) {
                if (i != $draggableBlock) newLines.push(lines[i]);
            }

            lines = newLines;
        }

        $draggedToBlock = null;
        $draggableBlock = null;
    });
</script>

<div class="note-body">
    {#each lines as line, index}
        <Block bind:line {index} />
    {/each}
</div>

<style>
    .note-body :global(:is(h1, h2, h3, h4, h5, h6, p)) {
        margin-bottom: 0.75em;
    }
</style>

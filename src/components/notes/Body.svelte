<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type Note from "~/interfaces/note";
    import Block from "./Block.svelte";

    export let note: Note;
    export let onChange: Function;

    let lines: string[] = [];

    beforeUpdate(() => {
        lines = note.body
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l != "");
    });

    $: {
        console.log(lines);
        onChange(lines.join("\n"));
    }
</script>

{#each lines as line}
    <Block bind:line />
{/each}

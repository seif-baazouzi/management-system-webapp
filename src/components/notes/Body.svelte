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
        lines = lines.map((l) => l.trim()).filter((l) => l != "");
        onChange(lines.join("\n"));
    }
</script>

<div class="note-body">
    {#each lines as line}
        <Block bind:line />
    {/each}
</div>

<style>
    .note-body :global(:is(h1, h2, h3, h4, h5, h6, p)) {
        margin-bottom: 0.75em;
    }
</style>

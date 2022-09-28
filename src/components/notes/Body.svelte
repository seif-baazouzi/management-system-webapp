<script lang="ts">
    import type Note from "~/interfaces/note";
    import parseNoteBody from "~/utils/parse-note-body";
    import Block from "./Block.svelte";

    export let note: Note;
    let blocks = parseNoteBody(note.body);
</script>

{#each blocks as block}
    <Block {block} />
{/each}

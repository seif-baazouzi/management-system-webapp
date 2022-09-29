<script lang="ts">
    import parseLine from "~/utils/parse-note-body";
    import Textarea from "../Textarea.svelte";

    export let line: string;
    let value = line;
    let block = parseLine(line);

    let editMode = false;
    function onPressEnter() {
        line = value;
        block = parseLine(value);
        editMode = false;
    }

    function onChange() {
        line = value;
        block = parseLine(value);
    }
</script>

{#if !editMode}
    <svelte:element this={block.type} on:dblclick={() => (editMode = true)}>
        {block.content}
    </svelte:element>
{:else}
    <Textarea
        bind:value
        {onChange}
        {onPressEnter}
        autoFocus={true}
        onBlur={() => (editMode = false)}
        style="display: block; font-size: 1rem; margin-bottom: 1rem"
    />
{/if}

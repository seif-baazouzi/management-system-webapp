<script lang="ts">
    import parseLine from "~/utils/parse-note-body";
    import Textarea from "../Textarea.svelte";

    export let line: string;
    let value = line;
    let block = parseLine(line);

    let editMode = false;
    function onPressEnter(event: any) {
        if (event?.key === "Enter") {
            event?.preventDefault();
            event?.target.blur();

            line = value;
            block = parseLine(value);
            editMode = false;
        }
    }
</script>

{#if !editMode}
    <svelte:element this={block.type} on:dblclick={() => (editMode = true)}>
        {block.content}
    </svelte:element>
{:else}
    <Textarea
        bind:value
        {onPressEnter}
        onBlur={() => (editMode = false)}
        onChange={() => {
            line = value;
            block = parseLine(value);
        }}
        style="display: block; font-size: 1rem"
    />
{/if}

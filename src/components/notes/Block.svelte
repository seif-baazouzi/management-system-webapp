<script lang="ts">
    import { draggableBlock, draggedToBlock } from "~/store";
    import parseLine from "~/utils/parse-note-body";
    import Textarea from "../Textarea.svelte";

    export let index: number;
    export let line: string;

    $: value = line;
    $: block = parseLine(line);

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
    <div
        class="block"
        on:dblclick={() => (editMode = true)}
        draggable={true}
        on:dragenter={() => {
            if ($draggableBlock === null) $draggableBlock = index;
        }}
        on:dragover={(e) => e.preventDefault()}
        on:drop={() => ($draggedToBlock = index)}
    >
        {#if block.type === "img"}
            <img src={block.content} alt={block.content} />
        {:else if block.type === "a"}
            <a href={block.content}>{block.content}</a>
        {:else if block.type === "iframe"}
            <div class="iframe-container">
                <iframe src={block.content} title={block.content} />
            </div>
        {:else}
            <svelte:element this={block.type}>{block.content} </svelte:element>
        {/if}
    </div>
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

<style>
    .block > * {
        margin-bottom: 0.75em;
    }

    img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: cover;
        border-radius: 0.125rem;
    }

    .iframe-container {
        padding: 1rem;
        border-radius: 0.25rem;
        background: var(--light-gray);
    }

    .iframe-container iframe {
        width: 100%;
        height: 80vh;
    }

    .block :global(li) {
        margin-left: 1rem;
    }
</style>

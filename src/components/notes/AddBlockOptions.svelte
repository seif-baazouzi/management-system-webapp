<script lang="ts">
    import { onMount } from "svelte";

    export let value: string;

    let selected = 0;
    const list = [
        { title: "Header 1", content: "h1:content" },
        { title: "Header 2", content: "h2:content" },
        { title: "Header 3", content: "h3:content" },
        { title: "Header 4", content: "h4:content" },
        { title: "Header 5", content: "h5:content" },
        { title: "Header 6", content: "h6:content" },
        { title: "Paragraph", content: "p:content" },
        { title: "Image", content: "img:url" },
        { title: "Link", content: "a:link" },
        { title: "Iframe", content: "iframe:url" },
        { title: "List Item", content: "li:content" },
    ];

    onMount(() => {
        document.addEventListener("keydown", (event: any) => {
            if (value != "/") return;

            switch (event.key) {
                case "ArrowUp":
                    selected !== 0 ? selected-- : (selected = list.length - 1);
                    scroll();
                    break;
                case "ArrowDown":
                    selected !== list.length - 1 ? selected++ : (selected = 0);
                    scroll();
                    break;
                case "Enter":
                    event.preventDefault();
                    value = list[selected].content;
                    break;
            }
        });
    });

    let options: HTMLDivElement;
    function scroll() {
        options.scrollTop = (options.scrollHeight / list.length) * selected;
    }
</script>

{#if value === "/"}
    <div class="options" bind:this={options}>
        {#each list as { title, content }, index}
            <div
                on:mouseenter={() => (selected = index)}
                on:click={() => (value = content)}
                class="option {selected === index ? 'active' : ''}"
            >
                {title}
            </div>
        {/each}
    </div>
{/if}

<style>
    .options {
        width: 360px;
        max-width: 100%;
        height: 8rem;
        padding: 0.25rem;
        border-radius: 0.25rem;
        position: relative;
        top: -9.5rem;
        box-shadow: var(--shadow);
        overflow-y: auto;
    }

    .option {
        font-size: 0.75rem;
        padding: 0.5em;
        border-radius: 0.5em;
    }

    .option.active {
        background-color: var(--light-gray);
    }
</style>

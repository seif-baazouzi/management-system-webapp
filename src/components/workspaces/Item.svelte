<script lang="ts">
    import { push } from "svelte-spa-router";

    export let w;
</script>

<details>
    <summary on:click={() => push(`/workspace/${w.workspace}`)}
        >{w.workspace}</summary
    >
    <div class="children">
        {#each w.children as child}
            <svelte:self w={child} />
        {/each}
    </div>
</details>

<style>
    summary {
        font-weight: bold;
        font-size: 0.75rem;
        padding: 0.125rem;
        text-transform: capitalize;
        cursor: pointer;
    }

    summary::marker {
        color: var(--gray);
    }

    .children {
        margin-left: 0.5rem;
    }
</style>

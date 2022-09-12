<script lang="ts">
    import { children } from "svelte/internal";

    export let w;
</script>

<details>
    <summary>{w.workspace}</summary>
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
    }

    summary::marker {
        color: var(--gray);
    }

    .children {
        margin-left: 0.5rem;
    }
</style>

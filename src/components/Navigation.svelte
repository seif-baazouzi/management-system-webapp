<script lang="ts">
    import { prevActive, nextActive } from "~/store";

    const prev = () => $prevActive && window.history.back();
    const next = () => $nextActive && window.history.forward();
</script>

<div class="arrows">
    <span class="arrow {$prevActive ? 'active' : ''}" on:click={prev}>←</span>
    <span class="arrow {$nextActive ? 'active' : ''}" on:click={next}>→</span>
</div>

<style>
    .arrows {
        user-select: none;
    }

    .arrow {
        font-size: 0.75rem;
        padding: 0.125rem;
        cursor: pointer;
        color: var(--gray);
    }

    .active {
        color: var(--black);
    }
</style>

<script lang="ts">
    interface Link {
        link: string;
        content: string;
    }

    export let links: Link[] = [];
</script>

<div class="chain">
    {#each links as link, index}
        {#if index != 0}<span>/</span>{/if}
        <a href={link.link}>{link.content}</a>
    {/each}
</div>

<style>
    .chain {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a {
        padding: 0.25em;
        font-size: 0.75rem;
        font-weight: bold;
    }

    a:hover {
        text-decoration: underline;
    }

    span {
        color: var(--gray);
        font-size: 1rem;
    }
</style>

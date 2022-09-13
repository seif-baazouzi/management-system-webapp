<script lang="ts">
    export let title: string;
    export let message: string;
</script>

<div class="error">
    <h1>{title}</h1>
    {#if message}
        <p>{message}</p>
    {/if}
</div>

<style>
    .error {
        width: 100%;
        height: 60vh;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 2rem;
    }

    p {
        color: var(--dark-gray);
    }
</style>

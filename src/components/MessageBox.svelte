<script lang="ts">
    export let title: string;
    export let icon: string = null;
    export let message = "";
</script>

<div class="message-box">
    {#if icon != null}
        <div class="icon">{icon}</div>
    {/if}
    <h2>{title}</h2>
    {#if message != null}
        <p>{message}</p>
    {/if}
</div>

<style>
    .message-box {
        padding: 5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .icon {
        font-size: 5rem;
    }

    h2 {
        font-size: 1.75rem;
        text-align: center;
        margin: 2rem 0 1rem;
        text-transform: capitalize;
    }

    p {
        text-align: center;
        font-size: 0.75rem;
        color: var(--dark-gray);
    }
</style>

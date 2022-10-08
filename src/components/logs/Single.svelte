<script lang="ts">
    import type Log from "~/interfaces/log";
    import { rightToLeft } from "~/store";

    import UpdateLogPopup from "~/popups/logs/Update.svelte";

    export let log: Log;
    let popup: string = null;
</script>

<div class="log {$rightToLeft ? 'revert' : ''}">
    <div class="content">{log.label}</div>
    <div class="content">{log.description}</div>
    <div class="content">{log.value}</div>
    <div class="content">{new Date(log.date).toDateString()}</div>
    <div class="content">
        <span class="action blue" on:click={() => (popup = "update")}>edit</span
        >
        <span class="action red">delete</span>
    </div>
</div>

{#if popup === "update"}
    <UpdateLogPopup {log} on:close={() => (popup = null)} />
{/if}

<style>
    .log {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .log:hover {
        background-color: var(--light-gray);
    }

    .log.revert {
        flex-direction: row-reverse;
    }

    .content {
        flex: 1;
        font-size: 0.75rem;
        padding: 0.5rem 0.25rem;
    }

    .log.revert .content {
        text-align: right;
    }

    .action {
        font-size: 0.75rem;
        padding: 0.25em 0.75em;
        font-weight: 600;
        cursor: pointer;
    }

    .action:hover {
        text-decoration: underline;
    }

    .action.blue {
        color: var(--blue);
    }

    .action.red {
        color: var(--red);
    }
</style>

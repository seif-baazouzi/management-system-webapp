<script lang="ts">
    import type Log from "~/interfaces/log";
    import { rightToLeft } from "~/store";

    export let log: Log;
</script>

<div class="log {$rightToLeft ? 'revert' : ''}">
    <div class="content">{log.label}</div>
    <div class="content">{log.description}</div>
    <div class="content">{log.value}</div>
    <div class="content">{new Date(log.date).toDateString()}</div>
</div>

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
</style>

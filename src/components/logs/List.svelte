<script type="ts">
    import type Log from "~/interfaces/log";
    import SingleLog from "./Single.svelte";
    import MessageBox from "~/components/MessageBox.svelte";

    import getLang from "~/langs/";
    import { rightToLeft } from "~/store";
    const lang = getLang();

    export let logs: Log[] = [];
</script>

<div class="logs {$rightToLeft ? 'revert' : ''}">
    {#if logs.length != 0}
        <div class="logs-head">
            <div class="title">Label</div>
            <div class="title">Description</div>
            <div class="title">Value</div>
            <div class="title">Date</div>
            <div class="title" />
        </div>
        {#each logs as log}
            <SingleLog {log} />
        {/each}
    {:else}
        <MessageBox icon="🧹" title={lang.noLogsThisMonth} />
    {/if}
</div>

<style>
    .logs-head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--light-gray);
    }

    .logs.revert .logs-head {
        flex-direction: row-reverse;
    }

    .title {
        flex: 1;
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0.5rem 0.25rem;
    }

    .logs.revert .title {
        text-align: right;
    }
</style>

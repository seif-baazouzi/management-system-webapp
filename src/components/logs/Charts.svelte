<script lang="ts">
    import Chart from "svelte-frappe-charts";

    import type Log from "~/interfaces/log";
    import { formatLogs } from "~/utils/format-logs";

    export let logs: Log[];
    $: data = formatLogs(logs);

    const lineOptions = {
        regionFill: 1,
    };
</script>

{#if logs.length}
    <Chart {data} {lineOptions} />
{/if}

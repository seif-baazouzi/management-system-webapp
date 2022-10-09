<script lang="ts">
    import Chart from "svelte-frappe-charts";

    import type Log from "~/interfaces/log";
    import {
        formatLogsForLineChart,
        formatLogsForDonutChart,
    } from "~/utils/format-logs";

    export let logs: Log[];
    $: lineData = formatLogsForLineChart(logs);
    $: donutData = formatLogsForDonutChart(logs);

    const lineOptions = {
        regionFill: 1,
    };
</script>

{#if logs.length}
    <div class="cart">
        <Chart data={lineData} {lineOptions} type="line" />
    </div>
    <div class="cart">
        <Chart data={donutData} type="donut" />
    </div>
{/if}

<style>
    .cart {
        padding: 1rem 0;
    }
</style>

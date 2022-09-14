<script lang="ts">
    import { formatMonth, range } from "~/utils";

    const date = new Date();

    export let month: number = date.getMonth() + 1;
    export let year: number = date.getFullYear();

    export let value = "";
    const setValue = () => (value = formatMonth(month, year));
    setValue();
</script>

<div class="input">
    <select bind:value={month} on:change={setValue}>
        {#each range(1, 13) as m}
            <option value={m}>{m}</option>
        {/each}
    </select>
    <select bind:value={year} on:change={setValue}>
        {#each range(1970, 2100) as y}
            <option value={y}>{y}</option>
        {/each}
    </select>
</div>

<style>
    .input {
        width: fit-content;
        display: inline-block;
        border-radius: 0.25em;
        background-color: var(--light-gray);
    }

    select {
        min-width: 4rem;
        padding: 0.25em;
        font-size: 0.75rem;
        background: none;
    }
</style>

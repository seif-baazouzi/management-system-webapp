<script lang="ts">
    import { rightToLeft } from "~/store";

    export let label = "";
    export let type = "text";
    export let value = "";
    export let error = null;
</script>

<div class="input-box {$rightToLeft ? 'revert' : ''}">
    <label for={label}>{label}</label>

    {#if type === "password"}
        <input type="password" id={label} bind:value />
    {:else if type === "date"}
        <input type="date" id={label} bind:value />
    {:else}
        <input type="text" id={label} bind:value />
    {/if}
    {#if error}
        <span>{error}</span>
    {/if}
</div>

<style scoped>
    .input-box {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .input-box.revert {
        text-align: right;
    }

    .input-box :is(label, input, span) {
        width: 100%;
        display: block;
        font-size: 0.75rem;
    }

    .input-box label {
        font-weight: bold;
    }

    .input-box :is(input, textarea) {
        padding: 0.5em;
        border-radius: 0.25em;
        background-color: var(--light-gray);
        border: 0.125em solid var(--light-gray);
    }

    .input-box :is(input, textarea):focus {
        border: 0.125em solid var(--blue);
    }

    .input-box span {
        color: var(--red);
        font-weight: bold;
        font-size: 0.6rem;
    }
</style>

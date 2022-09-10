<script lang="ts">
    export let label = "";
    export let type = "text";
    export let error = null;
</script>

<div class="input-box">
    <label for={label}>{label}</label>
    <input id="label" {type} />
    {#if error}
        <span>{error}</span>
    {/if}
</div>

<style scoped>
    .input-box {
        width: 100%;
        margin-bottom: 0.5rem;
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

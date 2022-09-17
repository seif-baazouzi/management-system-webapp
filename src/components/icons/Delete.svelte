<script lang="ts">
    export let size = "1rem";
    export let color = "#000";

    export let clickHandler = () => {};
</script>

<svg width={size} height={size} fill="none" on:click={clickHandler}
    ><path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6 7a1 1 0 0 1 1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 1 1 2 0v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1z"
        fill={color}
    /><path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM14 8a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zM4 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zM8 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1z"
        fill={color}
    /></svg
>

<style>
    svg {
        cursor: pointer;
    }
</style>

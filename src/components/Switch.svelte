<script>
    export let checked = false;
    export let onChange = null;

    function clickHandler() {
        checked = !checked;
        if (onChange) onChange(checked);
    }
</script>

<div class="switch{checked ? ' active' : ''}" on:click={clickHandler}>
    <div class="circle" />
</div>

<style>
    .switch {
        width: 2rem;
        height: 1rem;
        border-radius: 100vh;
        box-shadow: var(--shadow);
        background-color: var(--gray);
        transition: background 0.3s ease-out;
    }

    .switch.active {
        background-color: var(--blue);
    }

    .circle {
        width: 0.75rem;
        height: 0.75rem;
        position: relative;
        top: 0.125rem;
        left: 0.125rem;
        border-radius: 50%;
        background-color: #fff;
        transition: left 0.3s ease-out;
    }

    .switch.active .circle {
        left: 1.125rem;
    }
</style>

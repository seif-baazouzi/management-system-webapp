<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");
</script>

<div class="pop-up">
    <div class="bg" on:click={close} />
    <div class="close" on:click={close}>✖</div>
    <div class="box">
        <slot />
    </div>
</div>

<style>
    .pop-up {
        width: 100%;
        height: 100vh;
        padding: 1rem;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        overflow-y: auto;
    }

    .bg {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--popup-bg);
    }

    .close {
        font-size: 2rem;
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: var(--black);
        font-weight: bold;
        cursor: pointer;
    }

    .box {
        width: fit-content;
        max-width: min(100%, 1920px);
        padding: 1rem;
        position: relative;
        background-color: var(--white);
        box-shadow: var(--shadow);
        border-radius: 0.25rem;
    }
</style>

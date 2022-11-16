<script lang="ts">
    import Navigation from "~/components/Navigation.svelte";

    import { rightToLeft } from "~/store";

    export let toggle: Function;
    export let showMenu: boolean;
    export let sidebarClosed: boolean;
</script>

<div
    class="top-bar
    {$rightToLeft ? 'revert' : ''}
    {!sidebarClosed ? 'sidebar-open' : ''}"
>
    <div class="left-side">
        <span class="toggle-btn" on:click={() => toggle()}>≡</span>
        <Navigation />
        <slot name="title" />
    </div>
    {#if showMenu}
        <div class="menu" tabindex="0">
            <span>…</span>
            <div class="drop-down">
                <slot name="menu" />
            </div>
        </div>
    {/if}
</div>

<style>
    .top-bar {
        width: 100%;
        height: var(--top-bar-height);
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--white);
        transition: left 300ms ease-out, right 300ms ease-out;
        z-index: 2;
    }

    .top-bar.revert {
        flex-direction: row-reverse;
    }

    .left-side {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    .top-bar.revert .left-side {
        flex-direction: row-reverse;
    }

    .toggle-btn {
        padding: 0.25rem;
        font-size: 1.5rem;
        cursor: pointer;
        transform: translateY(-0.0125em);
        user-select: none;
    }

    .menu {
        position: relative;
    }

    .menu span {
        display: inline-block;
        padding: 0 1rem;
        font-size: 2rem;
        user-select: none;
        transform: translateY(-0.25em);
        cursor: pointer;
    }

    .menu .drop-down {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        border-radius: 0.5rem;
        display: none;
        background-color: var(--white);
        box-shadow: var(--shadow);
    }

    .top-bar.revert .drop-down {
        left: 1rem;
        right: auto;
    }

    .menu:focus-within .drop-down {
        display: block;
    }

    @media screen and (max-width: 480px) {
        .top-bar.sidebar-open {
            position: fixed;
            left: min(calc(100% - 1.75rem), var(--side-bar-width));
        }

        .top-bar.revert.sidebar-open {
            left: auto;
            right: min(calc(100% - 1.75rem), var(--side-bar-width));
        }
    }
</style>

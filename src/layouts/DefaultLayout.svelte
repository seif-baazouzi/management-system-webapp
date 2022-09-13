<script lang="ts">
    import { onMount } from "svelte";

    import Navigation from "~/components/Navigation.svelte";
    import SideBar from "~/components/SideBar.svelte";
    import { rightToLeft } from "~/store";

    let sidebarClosed = false;

    onMount(() => {
        sidebarClosed = localStorage.getItem("sidebarClosed") === "true";
    });

    function toggle() {
        sidebarClosed = !sidebarClosed;
        localStorage.setItem("sidebarClosed", sidebarClosed.toString());
    }
</script>

<div class="container {$rightToLeft ? 'revert' : ''}">
    <div class="side-bar {sidebarClosed ? 'close' : ''}">
        <SideBar />
    </div>
    <div class="content {sidebarClosed ? 'full-width' : ''}">
        <div class="top-bar">
            <div class="left-side">
                <span class="toggle-btn" on:click={toggle}>≡</span>
                <Navigation />
                <slot name="title" />
            </div>
            <div class="menu" tabindex="0">
                <span>…</span>
                <div class="drop-down">
                    <slot name="menu" />
                </div>
            </div>
        </div>
        <slot />
    </div>
</div>

<style>
    .container {
        width: 100%;
        min-height: 100vh;

        --side-bar-width: 300px;
        --top-bar-height: 2rem;
    }

    .side-bar {
        width: var(--side-bar-width);
        max-width: calc(100% - 2rem);
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--light-gray);
        overflow-y: auto;
        z-index: 1;
    }

    .side-bar.close {
        left: -100%;
    }

    .container.revert .side-bar {
        right: 0;
        left: unset;
    }

    .container.revert .side-bar.close {
        right: -100%;
    }

    .content {
        width: calc(100% - var(--side-bar-width));
        padding-top: var(--top-bar-height);
        position: relative;
        top: 0;
        left: var(--side-bar-width);
    }

    .content.full-width {
        width: 100%;
        left: 0;
    }

    .container.revert .content {
        left: unset;
    }

    .top-bar {
        width: 100%;
        height: var(--top-bar-height);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .container.revert .top-bar {
        flex-direction: row-reverse;
    }

    .side-bar,
    .content,
    .top-bar {
        transition: left 300ms ease-out, right 300ms ease-out;
    }

    .top-bar .left-side {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    .container.revert .top-bar .left-side {
        flex-direction: row-reverse;
    }

    .toggle-btn {
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

    .menu:focus-within .drop-down {
        display: block;
    }

    @media screen and (max-width: 480px) {
        .content {
            position: relative;
            width: 100%;
            left: 0;
        }

        .content:not(.full-width) .top-bar {
            left: min(calc(100% - 1.75rem), var(--side-bar-width));
        }

        .container.revert .content:not(.full-width) .top-bar {
            left: auto;
            right: min(calc(100% - 1.75rem), var(--side-bar-width));
        }
    }
</style>

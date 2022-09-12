<script lang="ts">
    import Navigation from "~/components/Navigation.svelte";
    import Workspaces from "~/components/workspaces/List.svelte";
    import { rightToLeft } from "~/store";

    let sidebarClosed = false;
    function toggle() {
        sidebarClosed = !sidebarClosed;
    }
</script>

<div class="container {$rightToLeft ? 'revert' : ''}">
    <div class="side-bar {sidebarClosed ? 'close' : ''}">
        <Workspaces />
    </div>
    <div class="content {sidebarClosed ? 'full-width' : ''}">
        <div class="top-bar">
            <div class="left-side">
                <span class="toggle-btn" on:click={toggle}>≡</span>
                <Navigation />
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
        padding: 0.5rem;
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
    }

    .container.revert .top-bar .left-side {
        flex-direction: row-reverse;
    }

    .toggle-btn {
        font-size: 1.5rem;
        cursor: pointer;
        transform: translateY(-0.025em);
        user-select: none;
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

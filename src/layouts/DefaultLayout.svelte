<script lang="ts">
    import { rightToLeft } from "~/store";

    let sidebarClosed = false;
    function toggle() {
        sidebarClosed = !sidebarClosed;
    }
</script>

<div class="container {$rightToLeft ? 'revert' : ''}">
    <div class="side-bar {sidebarClosed ? 'close' : ''}" />
    <div class="content {sidebarClosed ? 'full-width' : ''}">
        <div class="top-bar">
            <span class="toggle-btn" on:click={toggle}>≡</span>
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
        max-width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: var(--light-gray);
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

    .toggle-btn {
        font-size: 2rem;
        cursor: pointer;
    }

    @media screen and (max-width: 480px) {
        .content {
            position: static;
        }

        .content:not(.full-width) .top-bar {
            left: var(--side-bar-width);
        }
    }
</style>

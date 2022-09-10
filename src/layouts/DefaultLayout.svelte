<script lang="ts">
    let sidebarClosed = false;
    function toggle() {
        sidebarClosed = !sidebarClosed;
    }
</script>

<div class="container">
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

    .top-bar {
        width: 100%;
        height: var(--top-bar-height);
        position: absolute;
        top: 0;
        left: 0;
    }

    .side-bar,
    .content,
    .top-bar {
        transition: left 300ms ease-out;
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

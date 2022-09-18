<script lang="ts">
    import { onMount } from "svelte";

    import SideBar from "~/components/SideBar.svelte";
    import TopBar from "~/components/TopBar.svelte";
    import { rightToLeft } from "~/store";

    export let showMenu = true;
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
        <TopBar bind:showMenu {toggle} {sidebarClosed}>
            <slot name="menu" slot="menu" />
            <slot name="title" slot="title" />
        </TopBar>
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
        z-index: 100;
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

    .side-bar,
    .content {
        transition: left 300ms ease-out, right 300ms ease-out;
    }

    @media screen and (max-width: 480px) {
        .content {
            position: relative;
            width: 100%;
            left: 0;
        }
    }
</style>

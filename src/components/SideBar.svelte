<script lang="ts">
    import Workspaces from "~/components/workspaces/List.svelte";
    import AddWorkspacePopup from "~/popups/workspaces/Add.svelte";

    let showAddWorkspacePopup = false;
</script>

<div class="side-bar">
    <div class="content">
        <div class="links">
            <a href="#/"><span>🕒</span> Today Todos</a>
        </div>
        <Workspaces />
    </div>
    <div class="add-workspace" on:click={() => (showAddWorkspacePopup = true)}>
        <span>+</span> New Workspace
    </div>
</div>

{#if showAddWorkspacePopup}
    <AddWorkspacePopup on:close={() => (showAddWorkspacePopup = false)} />
{/if}

<style>
    .side-bar {
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
    }

    .content {
        padding: 0.5rem;
        flex: 1;
    }

    .links {
        margin-bottom: 1rem;
    }

    .links a {
        font-size: 0.75rem;
        font-weight: bold;
        color: var(--black);
    }

    .links a span {
        font-size: 0.6rem;
        margin-right: 0.25em;
    }

    .add-workspace {
        width: 100%;
        position: sticky;
        bottom: 0;
        left: 0;
        color: var(--gray);
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0.5rem 1rem;
        border-top: 0.025em solid var(--gray);
        cursor: pointer;
        user-select: none;
        transition: color 0.3s ease-out;
        font-weight: bold;
        background-color: var(--light-gray);
    }

    .add-workspace:hover {
        color: var(--dark-gray);
    }

    .add-workspace span {
        display: inline-block;
        font-size: 1.25rem;
        color: var(--gray);
        font-weight: 200;
        margin-right: 0.25rem;
    }
</style>

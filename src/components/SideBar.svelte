<script lang="ts">
    import Workspaces from "~/components/workspaces/List.svelte";
    import AddWorkspacePopup from "~/popups/AddWorkspacePopup.svelte";

    let showAddWorkspacePopup = false;
</script>

<div class="side-bar">
    <div class="content">
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
    .content {
        padding: 0.5rem;
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

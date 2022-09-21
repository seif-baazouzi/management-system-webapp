<script lang="ts">
    import AddWorkspacePopup from "~/popups/workspaces/Add.svelte";

    import getLang from "~/langs/";
    import { rightToLeft } from "~/store";
    const lang = getLang();

    let showAddWorkspacePopup = false;
</script>

<div
    class="add-workspace {$rightToLeft ? 'revert' : ''}"
    on:click={() => (showAddWorkspacePopup = true)}
>
    <span>+</span>
    {lang.newWorkspace}
</div>

{#if showAddWorkspacePopup}
    <AddWorkspacePopup on:close={() => (showAddWorkspacePopup = false)} />
{/if}

<style>
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

    .add-workspace.revert {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
    }

    .add-workspace span {
        display: inline-block;
        font-size: 1.25rem;
        color: var(--gray);
        font-weight: 200;
        margin-right: 0.25rem;
    }

    .add-workspace.revert span {
        margin-right: 0;
        margin-left: 0.25rem;
    }
</style>

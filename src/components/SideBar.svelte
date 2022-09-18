<script lang="ts">
    import Workspaces from "~/components/workspaces/List.svelte";
    import AddWorkspaceBtn from "./workspaces/AddWorkspaceBtn.svelte";
</script>

<div class="side-bar">
    <div class="content">
        <div class="links">
            <a href="#/"><span>🕒</span> Today Todos</a>
        </div>
        <Workspaces />
    </div>
    <AddWorkspaceBtn />
</div>

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
</style>

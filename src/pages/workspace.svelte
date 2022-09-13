<script lang="ts">
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import Error from "~/components/Error.svelte";
    import { workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import Children from "~/components/workspaces/Children.svelte";

    export let params: { workspaceID: string };
    let workspace: Workspace = null;

    workspacesList.subscribe(() => {
        workspace = $workspacesList.filter(
            (w) => w.workspaceID === params.workspaceID
        )[0];
    });
</script>

<DefaultLayout>
    <div class="container">
        {#if workspace}
            <h1>{workspace.workspace}</h1>
            <div class="content">
                <Children workspaceID={params.workspaceID} />
                <div class="links">
                    <a href="#/workspace/{workspace.workspaceID}/todos">Todos</a
                    >
                    <a href="#/workspace/{workspace.workspaceID}/notes">Notes</a
                    >
                    <a href="#/workspace/{workspace.workspaceID}/logs">Logs</a>
                </div>
            </div>
        {:else}
            <Error title="404 Error" message="Workspace not found." />
        {/if}
    </div>
</DefaultLayout>

<style>
    .container {
        width: 100%;
        max-width: 1200px;
        padding: 1rem;
        margin: 0 auto;
    }

    .container > h1 {
        font-size: 3rem;
        text-transform: capitalize;
    }

    .content {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .links {
        display: flex;
        flex-direction: column;
    }

    .links a {
        font-size: 1rem;
        font-weight: bold;
        padding: 0.25em;
    }

    .links a:hover {
        text-decoration: underline;
    }
</style>

<script lang="ts">
    import { push } from "svelte-spa-router";
    import { workspacesService } from "~/config";

    import type Workspace from "~/interfaces/workspace";
    import { draggableWorkspace, rightToLeft, workspacesList } from "~/store";
    import ajax from "~/utils/ajax";

    export let w: Workspace;

    function setParentWorkspace(newParentWorkspaceID: string) {
        if (!$draggableWorkspace) return;
        console.log($draggableWorkspace);

        $workspacesList = $workspacesList.map((workspace) => {
            if (workspace.workspaceID === $draggableWorkspace.workspaceID) {
                workspace.parentWorkspace = newParentWorkspaceID;
                ajax.put(
                    `${workspacesService}/api/v1/workspaces/${workspace.workspaceID}`,
                    null,
                    {
                        workspace: workspace.workspace,
                        icon: workspace.icon,
                        parentWorkspace: workspace.parentWorkspace,
                    }
                );
            }

            return workspace;
        });

        $draggableWorkspace = null;
    }
</script>

<details
    class={$rightToLeft ? "revert" : ""}
    draggable="true"
    on:drop={() => setParentWorkspace(w.workspaceID)}
    on:drag={() => {
        if ($draggableWorkspace === null) $draggableWorkspace = w;
    }}
    on:dragover={(e) => e.preventDefault()}
    on:dragend={() =>
        setParentWorkspace("00000000-0000-0000-0000-000000000000")}
>
    <summary
        class={w.children?.length === 0 ? "no-children" : ""}
        on:click={() => push(`/workspace/${w.workspaceID}`)}
        >{w.icon} {w.workspace}</summary
    >
    <div class="children">
        {#each w.children as child}
            <svelte:self w={child} />
        {/each}
    </div>
</details>

<style>
    summary {
        font-weight: bold;
        font-size: 0.75rem;
        padding: 0.125rem;
        text-transform: capitalize;
        cursor: pointer;
    }

    summary::marker {
        color: var(--gray);
    }

    summary.no-children::marker {
        content: "";
    }

    .children {
        margin-left: 0.5rem;
    }

    .revert .children {
        margin-left: 0;
        margin-right: 0.5rem;
    }
</style>

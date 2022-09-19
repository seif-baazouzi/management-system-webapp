<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type Workspace from "~/interfaces/workspace";
    import { workspacesList } from "~/store";

    export let workspaceID: string;
    let childrenWorkspaces: Workspace[] = [];

    beforeUpdate(() => {
        childrenWorkspaces = $workspacesList.filter(
            (w) => w.parentWorkspace === workspaceID
        );
    });
</script>

<div class="workspaces-list">
    <h4>Children Workspaces</h4>
    <div class="links">
        {#each childrenWorkspaces as w}
            <a href="#/workspace/{w.workspaceID}">{w.workspace}</a>
        {/each}
    </div>
</div>

<style>
    .workspaces-list {
        width: 100%;
    }

    .links {
        margin-top: 0.75rem;
    }
</style>

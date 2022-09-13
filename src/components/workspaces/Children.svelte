<script lang="ts">
    import { workspacesList } from "~/store";

    export let workspaceID: string;

    let childrenWorkspaces = $workspacesList.filter(
        (w) => w.parentWorkspace === workspaceID
    );
</script>

<h4>Children Workspaces</h4>
<div class="links">
    {#each childrenWorkspaces as w}
        <a href="#/workspace/{w.workspaceID}">{w.workspace}</a>
    {/each}
</div>

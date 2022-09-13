<script lang="ts">
    import { onMount } from "svelte";

    import { workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import parseWorkspaces from "~/utils/parse-workspaces";
    import Item from "./Item.svelte";
    import getLang from "~/langs/";
    import { workspacesList } from "~/store";

    const lang = getLang();

    onMount(async () => {
        const data = await ajax.get(`${workspacesService}/api/v1/workspaces`);
        $workspacesList = data.workspaces ?? [];
    });
</script>

<h6>{lang.workspaces}</h6>
<div class="workspaces-list">
    {#each parseWorkspaces($workspacesList) as w}
        <Item {w} />
    {/each}
</div>

<style>
    h6 {
        color: var(--gray);
        text-transform: uppercase;
        margin-bottom: 0.25rem;
        letter-spacing: 0.075em;
    }
</style>

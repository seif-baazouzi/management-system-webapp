<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { todosService, workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import { workspacesList } from "~/store";
    import { push } from "svelte-spa-router";

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;

    async function deleteWorkspace(event: any) {
        event?.preventDefault();

        ajax.del(`${todosService}/api/v1/todos/workspace/${workspaceID}`);
        ajax.del(`${workspacesService}/api/v1/workspaces/${workspaceID}`);

        $workspacesList = $workspacesList.filter(
            (w) => w.workspaceID != workspaceID
        );

        close();
        push("/");
    }
</script>

<Popup on:close={close}>
    <div class="popup-content-delete">
        <h3>Are you sure you want yo delete this workspace!</h3>
        <div class="buttons">
            <button on:click={close}>Cancel</button>
            <button class="red" on:click={deleteWorkspace}>Delete</button>
        </div>
    </div>
</Popup>

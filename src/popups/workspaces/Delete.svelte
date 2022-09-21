<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { todosService, workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import { workspacesList } from "~/store";
    import { push } from "svelte-spa-router";

    import getLang from "~/langs/";
    const lang = getLang();

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
        <h3>{lang.deleteWorkspaceMessage}</h3>
        <div class="buttons">
            <button on:click={close}>{lang.cancel}</button>
            <button class="red" on:click={deleteWorkspace}>
                {lang.delete}
            </button>
        </div>
    </div>
</Popup>

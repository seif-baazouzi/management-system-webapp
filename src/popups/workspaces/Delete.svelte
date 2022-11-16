<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import {
        logsService,
        notesService,
        todosService,
        workspacesService,
    } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import { workspacesList } from "~/store";
    import { push } from "svelte-spa-router";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;

    async function deleteWorkspace(workspaceID: string) {
        ajax.del(`${todosService}/api/v1/todos/workspace/${workspaceID}`);
        ajax.del(`${notesService}/api/v1/notes/workspace/${workspaceID}`);
        ajax.del(`${logsService}/api/v1/logs/workspace/${workspaceID}`);
        ajax.del(`${workspacesService}/api/v1/workspaces/${workspaceID}`);

        $workspacesList.map((w) => {
            if (w.parentWorkspace === workspaceID)
                deleteWorkspace(w.workspaceID);
        });
    }

    async function deleteWorkspaceHandler() {
        deleteWorkspace(workspaceID);

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
            <button class="red" on:click={deleteWorkspaceHandler}>
                {lang.delete}
            </button>
        </div>
    </div>
</Popup>

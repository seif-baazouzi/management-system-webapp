<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";
    import { workspacesList } from "~/store";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;
    export let workspace = "";
    let errors: any = {};

    async function updateWorkspace(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${workspacesService}/api/v1/workspaces/${workspaceID}`,
            null,
            {
                workspace,
            }
        );

        if (res.message === "success") {
            $workspacesList = $workspacesList.map((w) => {
                if (w.workspaceID === workspaceID) {
                    w.workspace = workspace;
                }

                return w;
            });

            workspace = "";
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="popup-content">
        <h3>{lang.updateWorkspace}</h3>
        <form on:submit={updateWorkspace}>
            <Input
                type="text"
                label="Workspace"
                bind:value={workspace}
                error={errors.workspace}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

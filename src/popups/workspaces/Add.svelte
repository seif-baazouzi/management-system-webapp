<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { defaultIcon, workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";
    import { workspacesList } from "~/store";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    let workspace = "";
    let errors: any = {};

    async function addWorkspace(event: any) {
        event?.preventDefault();

        const res = await ajax.post(
            `${workspacesService}/api/v1/workspaces`,
            null,
            {
                workspace,
                icon: defaultIcon,
            }
        );

        if (res.message === "success") {
            $workspacesList = [
                ...$workspacesList,
                {
                    workspaceID: res.workspaceID,
                    workspace,
                    icon: defaultIcon,
                    parentWorkspace: "00000000-0000-0000-0000-000000000000",
                },
            ];

            workspace = "";
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="popup-content">
        <h3>{lang.addNewWorkspace}</h3>
        <form on:submit={addWorkspace}>
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

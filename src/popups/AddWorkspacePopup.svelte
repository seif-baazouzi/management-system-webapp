<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/Input.svelte";
    import { workspacesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "./Popup.svelte";

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
            }
        );

        if (res.message === "success") {
            workspace = "";
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="content">
        <h3>Add new workspace</h3>
        <form on:submit={addWorkspace}>
            <Input
                type="text"
                label="Workspace"
                bind:value={workspace}
                error={errors.workspace}
            />
            <button class="blue block">Submit</button>
        </form>
    </div>
</Popup>

<style>
    .content {
        width: 480px;
        max-width: 100%;
    }

    h3 {
        text-align: center;
        margin-bottom: 2rem;
    }
</style>

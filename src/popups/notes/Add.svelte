<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { notesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    import { refreshPage } from "~/store";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;

    let title = "";
    let errors: any = {};

    async function addWorkspace(event: any) {
        event?.preventDefault();

        const res = await ajax.post(
            `${notesService}/api/v1/notes/${workspaceID}`,
            null,
            { title }
        );

        if (res.message === "success") {
            $refreshPage = true;
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="popup-content">
        <h3>{lang.addNewNote}</h3>
        <form on:submit={addWorkspace}>
            <Input
                type="text"
                label="Title"
                bind:value={title}
                error={errors.title}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

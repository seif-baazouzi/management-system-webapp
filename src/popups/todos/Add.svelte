<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import Input from "~/components/inputs/Input.svelte";
    import { todosService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;

    let title = "";
    let body = "";
    let startingDate = new Date().toISOString().split("T")[0];
    let endingDate = null;
    let errors: any = {};

    async function addTodo(event: any) {
        event?.preventDefault();

        const res = await ajax.post(
            `${todosService}/api/v1/todos/${workspaceID}`,
            null,
            {
                title,
                body,
                startingDate: new Date(startingDate),
                endingDate: endingDate ? new Date(endingDate) : null,
            }
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
        <h3>{lang.createNewTodo}</h3>
        <form on:submit={addTodo}>
            <Input
                type="text"
                label="Title"
                bind:value={title}
                error={errors.title}
            />
            <Input
                type="text"
                label="Body"
                bind:value={body}
                error={errors.body}
            />
            <Input
                type="date"
                label="Starting Date"
                bind:value={startingDate}
                error={errors.startingDate}
            />
            <Input
                type="date"
                label="Ending Date"
                bind:value={endingDate}
                error={errors.endingDate}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { todosService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;
    export let createdTodo = false;

    let title = "";
    let body = "";
    let startingDate = new Date().toISOString().split("T")[0];
    let endingDate = null;
    let errors: any = {};

    async function addWorkspace(event: any) {
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
            createdTodo = true;
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="content">
        <h3>Add new todo</h3>
        <form on:submit={addWorkspace}>
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

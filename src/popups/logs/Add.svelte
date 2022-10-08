<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import Input from "~/components/inputs/Input.svelte";
    import { logsService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let workspaceID: string;

    let label = "";
    let description = "";
    let value = 0;
    let date = new Date().toISOString().split("T")[0];
    let errors: any = {};

    async function addTodo(event: any) {
        event?.preventDefault();

        const res = await ajax.post(
            `${logsService}/api/v1/logs/${workspaceID}`,
            null,
            {
                label,
                description,
                value,
                date: new Date(date),
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
        <h3>{lang.addNewLog}</h3>
        <form on:submit={addTodo}>
            <Input
                type="text"
                label="Label"
                bind:value={label}
                error={errors.label}
            />
            <Input
                type="text"
                label="Description"
                bind:value={description}
                error={errors.description}
            />
            <Input
                type="number"
                label="Value"
                bind:value
                error={errors.value}
            />
            <Input
                type="date"
                label="Date"
                bind:value={date}
                error={errors.date}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

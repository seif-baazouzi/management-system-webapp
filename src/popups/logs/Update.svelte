<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { logsService } from "~/config";
    import type Log from "~/interfaces/log";
    import { refreshPage } from "~/store";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let log: Log;
    log.date = new Date(log.date).toISOString().split("T")[0];

    let errors: any = {};

    async function updateLog(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${logsService}/api/v1/logs/${log.logID}`,
            null,
            {
                label: log.label,
                description: log.description,
                value: log.value,
                date: new Date(log.date),
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
        <h3>{lang.editLog}</h3>
        <form on:submit={updateLog}>
            <Input
                type="text"
                label="Label"
                bind:value={log.label}
                error={errors.label}
            />
            <Input
                type="text"
                label="Description"
                bind:value={log.description}
                error={errors.description}
            />
            <Input
                type="number"
                label="Value"
                bind:value={log.value}
                error={errors.value}
            />
            <Input
                type="date"
                label="Date"
                bind:value={log.date}
                error={errors.date}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

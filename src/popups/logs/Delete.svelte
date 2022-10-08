<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import { logsService } from "~/config";
    import type Log from "~/interfaces/log";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let log: Log;

    async function deleteTodo(event: any) {
        event?.preventDefault();

        await ajax.del(`${logsService}/api/v1/logs/${log.logID}`);
        $refreshPage = true;
        close();
    }
</script>

<Popup on:close={close}>
    <div class="popup-content-delete">
        <h3>{lang.deleteLogMessage}</h3>
        <div class="buttons">
            <button on:click={close}>{lang.cancel}</button>
            <button class="red" on:click={deleteTodo}>{lang.delete}</button>
        </div>
    </div>
</Popup>

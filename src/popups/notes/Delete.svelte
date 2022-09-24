<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import { notesService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    import type Note from "~/interfaces/note";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let note: Note;

    async function deleteTodo(event: any) {
        event?.preventDefault();

        await ajax.del(`${notesService}/api/v1/notes/${note.noteID}`);
        $refreshPage = true;
        close();
    }
</script>

<Popup on:close={close}>
    <div class="popup-content-delete">
        <h3>{lang.deleteNoteMessage}</h3>
        <div class="buttons">
            <button on:click={close}>{lang.cancel}</button>
            <button class="red" on:click={deleteTodo}>{lang.delete}</button>
        </div>
    </div>
</Popup>

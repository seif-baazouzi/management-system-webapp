<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    export let todo: Todo;

    async function deleteTodo(event: any) {
        event?.preventDefault();

        await ajax.del(`${todosService}/api/v1/todos/${todo.todoID}`);
        $refreshPage = true;
        close();
    }
</script>

<Popup on:close={close}>
    <div class="popup-content-delete">
        <h3>{lang.deleteTodoMessage}</h3>
        <div class="buttons">
            <button on:click={close}>{lang.cancel}</button>
            <button class="red" on:click={deleteTodo}>{lang.delete}</button>
        </div>
    </div>
</Popup>

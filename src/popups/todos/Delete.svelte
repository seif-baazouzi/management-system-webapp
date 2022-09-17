<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { refreshPage } from "~/store";
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

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
    <div class="content">
        <h3>Are you sure you want yo delete this todo!</h3>
        <div class="buttons">
            <button on:click={close}>Cancel</button>
            <button class="red" on:click={deleteTodo}>Delete</button>
        </div>
    </div>
</Popup>

<style>
    .content {
        width: 520px;
        max-width: 100%;
    }

    .buttons {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.5rem;
    }
</style>

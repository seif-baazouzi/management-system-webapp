<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import { refreshPage } from "~/store";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    const formatDate = (d: string) =>
        !d ? null : new Date(d).toISOString().split("T")[0];

    export let todo: Todo;
    todo.startingDate = formatDate(todo.startingDate);
    todo.endingDate = formatDate(todo.endingDate);

    let errors: any = {};

    async function updateTodo(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${todosService}/api/v1/todos/${todo.todoID}`,
            null,
            {
                title: todo.title,
                body: todo.body,
                startingDate: new Date(todo.startingDate),
                endingDate: todo.endingDate ? new Date(todo.endingDate) : null,
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
        <h3>{lang.editTodo}</h3>
        <form on:submit={updateTodo}>
            <Input
                type="text"
                label="Title"
                bind:value={todo.title}
                error={errors.title}
            />
            <Input
                type="text"
                label="Body"
                bind:value={todo.body}
                error={errors.body}
            />
            <Input
                type="date"
                label="Starting Date"
                bind:value={todo.startingDate}
                error={errors.startingDate}
            />
            <Input
                type="date"
                label="Ending Date"
                bind:value={todo.endingDate}
                error={errors.endingDate}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

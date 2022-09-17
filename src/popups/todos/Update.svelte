<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    const formatDate = (d: string) =>
        !d ? null : new Date(d).toISOString().split("T")[0];

    export let todo: Todo;
    let clone = todo;
    clone.startingDate = formatDate(clone.startingDate);
    clone.endingDate = formatDate(clone.endingDate);

    let errors: any = {};

    async function updateTodo(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${todosService}/api/v1/todos/${todo.todoID}`,
            null,
            {
                title: clone.title,
                body: clone.body,
                startingDate: new Date(clone.startingDate),
                endingDate: clone.endingDate
                    ? new Date(clone.endingDate)
                    : null,
            }
        );

        if (res.message === "success") {
            todo = clone;
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="content">
        <h3>Add new todo</h3>
        <form on:submit={updateTodo}>
            <Input
                type="text"
                label="Title"
                bind:value={clone.title}
                error={errors.title}
            />
            <Input
                type="text"
                label="Body"
                bind:value={clone.body}
                error={errors.body}
            />
            <Input
                type="date"
                label="Starting Date"
                bind:value={clone.startingDate}
                error={errors.startingDate}
            />
            <Input
                type="date"
                label="Ending Date"
                bind:value={clone.endingDate}
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

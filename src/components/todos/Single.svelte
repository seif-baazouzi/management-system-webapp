<script lang="ts">
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import UpdatePopup from "~/popups/todos/Update.svelte";
    import DeletePopup from "~/popups/todos/Delete.svelte";
    import ajax from "~/utils/ajax";
    import DeleteIcon from "~/components/icons/Delete.svelte";
    import EditIcon from "~/components/icons/Edit.svelte";

    export let todo: Todo;
    let popup: string = null;

    $: {
        todo.done;
        ajax.put(`${todosService}/api/v1/todos/${todo.todoID}`, null, todo);
    }
</script>

<div class="todo {todo.done ? 'done' : ''}">
    <h3>
        <input type="checkbox" bind:checked={todo.done} />
        {todo.title}
        <div class="actions">
            <EditIcon color="green" clickHandler={() => (popup = "update")} />
            <DeleteIcon
                color="var(--red)"
                clickHandler={() => (popup = "delete")}
            />
        </div>
    </h3>
    {#if todo.body}
        <p>{todo.body}</p>
    {/if}
</div>

{#if popup === "update"}
    <UpdatePopup {todo} on:close={() => (popup = null)} />
{/if}

{#if popup === "delete"}
    <DeletePopup {todo} on:close={() => (popup = null)} />
{/if}

<style>
    .todo {
        padding: 1rem;
        border-radius: 1rem;
    }

    .todo:hover {
        background-color: var(--light-gray);
    }

    .todo.done {
        opacity: 0.25;
    }

    input {
        --size: 1rem;
        width: var(--size);
        height: var(--size);
        margin-right: 0.25rem;
    }

    h3 {
        font-size: 1rem;
        position: relative;
        padding-right: 2rem;
    }

    .actions {
        position: absolute;
        top: 0;
        right: 0;
        display: none;
    }

    .todo:hover .actions {
        display: block;
    }

    p {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: var(--dark-gray);
    }

    @media screen and (max-width: 768px) {
        .actions {
            display: block;
        }
    }
</style>

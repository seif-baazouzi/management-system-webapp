<script lang="ts">
    import type Todo from "~/interfaces/todo";

    export let todo: Todo;
</script>

<div class="todo {todo.done ? 'done' : ''}">
    <h3>
        <input type="checkbox" bind:checked={todo.done} />
        {todo.title}
    </h3>
    {#if todo.body}
        <p>{todo.body}</p>
    {/if}
</div>

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
    }

    p {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: var(--dark-gray);
    }
</style>

<script type="ts">
    import type Todo from "~/interfaces/todo";
    import SingleTodo from "./Single.svelte";

    export let todos: { [index: string]: Todo[] };
</script>

<div class="todos">
    {#each Object.entries(todos) as [date, todosList]}
        {#if todosList != null}
            <h3 class="date">{new Date(date).toDateString()}</h3>
            <ul>
                {#each todosList as todo}
                    <SingleTodo {todo} />
                {/each}
            </ul>
        {/if}
    {/each}
</div>

<style>
    .date {
        padding: 1rem 0;
        position: sticky;
        top: 2rem;
        background-color: var(--white);
        z-index: 1;
    }
</style>

<script type="ts">
    import type Todo from "~/interfaces/todo";
    import SingleTodo from "./Single.svelte";
    import MessageBox from "~/components/MessageBox.svelte";

    export let todos: { [index: string]: Todo[] };

    function isTodosEmpty(todos): boolean {
        for (let [_, todosList] of Object.entries(todos)) {
            if (todosList !== null) {
                return false;
            }
        }

        return true;
    }
</script>

<div class="todos">
    {#if !isTodosEmpty(todos)}
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
    {:else}
        <MessageBox icon="🧹" title="There is no todos this month!" />
    {/if}
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

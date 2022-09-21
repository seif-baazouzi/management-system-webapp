<script type="ts">
    import type Todo from "~/interfaces/todo";
    import SingleTodo from "./Single.svelte";
    import MessageBox from "~/components/MessageBox.svelte";

    import getLang from "~/langs/";
    import { rightToLeft } from "~/store";
    const lang = getLang();

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

<div class="todos {$rightToLeft ? 'revert' : ''}">
    {#if !isTodosEmpty(todos)}
        {#each Object.entries(todos) as [date, todosList]}
            {#if todosList != null}
                <h3 class="date">{new Date(date).toDateString()}</h3>
                {#each todosList as todo}
                    <SingleTodo {todo} />
                {/each}
            {/if}
        {/each}
    {:else}
        <MessageBox icon="🧹" title={lang.noTodoThisMonth} />
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

    .revert h3 {
        text-align: right;
    }
</style>

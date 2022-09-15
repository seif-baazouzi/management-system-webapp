<script type="ts">
    export let todos: { [index: string]: any[] };
</script>

<div class="todos">
    {#each Object.entries(todos) as [date, todosList]}
        <h3>{date}</h3>
        {#if todosList != null}
            <ul>
                {#each todosList as todo}
                    <li>{todo.title}</li>
                {/each}
            </ul>
        {/if}
    {/each}
</div>

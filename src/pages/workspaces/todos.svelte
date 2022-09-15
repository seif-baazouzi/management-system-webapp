<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import Error from "~/components/Error.svelte";
    import { workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { todosService } from "~/config";
    import Month from "~/components/inputs/Month.svelte";
    import TodosList from "~/components/todos/List.svelte";
    import AddTodoPopup from "~/popups/todos/Add.svelte";
    import { formatMonth } from "~/utils";

    export let params: { workspaceID: string };
    let workspace: Workspace = null;

    workspacesList.subscribe(() => {
        workspace = $workspacesList.filter(
            (w) => w.workspaceID === params.workspaceID
        )[0];
    });

    let month = formatMonth();
    let todos = {};

    let popup = false;
    let createdTodo = false;

    onMount(getTodos);

    beforeUpdate(() => {
        if (createdTodo) {
            getTodos();
            createdTodo = false;
        }
    });

    $: {
        month;
        getTodos();
    }

    async function getTodos() {
        const res = await ajax.get(
            `${todosService}/api/v1/todos/${params.workspaceID}/month/${month}`
        );

        todos = res.todos;
    }
</script>

<svelte:head>
    <title>{workspace?.workspace} Workspace Todos</title>
</svelte:head>

<DefaultLayout>
    <div slot="title">
        <LinksChain
            links={[
                {
                    link: `#/workspace/${workspace?.workspaceID}`,
                    content: workspace?.workspace,
                },
                {
                    link: `#/workspace/${workspace?.workspaceID}/todos`,
                    content: "Todos",
                },
            ]}
        />
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = true)}>Add todo</div>
    </div>

    <div class="page-container">
        {#if workspace}
            <h1>Todos</h1>
            <div class="content">
                <Month
                    bind:value={month}
                    style="position: absolute; right: 0; z-index: 1"
                />
                <TodosList {todos} />
            </div>
        {:else}
            <Error title="404 Error" message="Workspace not found." />
        {/if}
    </div>
</DefaultLayout>

{#if popup}
    <AddTodoPopup
        workspaceID={params.workspaceID}
        bind:createdTodo
        on:close={() => (popup = false)}
    />
{/if}

<style>
    .content {
        margin-top: 1rem;
        position: relative;
    }
</style>

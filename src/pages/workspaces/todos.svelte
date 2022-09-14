<script lang="ts">
    import { beforeUpdate } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import Error from "~/components/Error.svelte";
    import { workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { todosService } from "~/config";
    import Month from "~/components/inputs/Month.svelte";
    import TodosList from "~/components/todos/List.svelte";

    export let params: { workspaceID: string };
    let workspace: Workspace = null;

    workspacesList.subscribe(() => {
        workspace = $workspacesList.filter(
            (w) => w.workspaceID === params.workspaceID
        )[0];
    });

    let month = "";
    let todos = {};

    beforeUpdate(async () => {
        const res = await ajax.get(
            `${todosService}/api/v1/todos/${params.workspaceID}/month/${month}`
        );

        todos = res.todos;
    });
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

    <div class="page-container">
        {#if workspace}
            <h1>Todos</h1>
            <div class="content">
                <Month bind:value={month} />
                <TodosList {todos} />
            </div>
        {:else}
            <Error title="404 Error" message="Workspace not found." />
        {/if}
    </div>
</DefaultLayout>

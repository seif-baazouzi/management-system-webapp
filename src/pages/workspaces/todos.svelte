<script lang="ts">
    import { onMount } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";
    import { refreshPage, rightToLeft, workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { todosService } from "~/config";
    import Month from "~/components/inputs/Month.svelte";
    import TodosList from "~/components/todos/List.svelte";
    import AddTodoPopup from "~/popups/todos/Add.svelte";
    import { formatMonth } from "~/utils";

    import getLang from "~/langs/";
    const lang = getLang();

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

    onMount(getTodos);

    $: {
        month;
        getTodos();
    }

    refreshPage.subscribe(() => {
        if ($refreshPage) {
            getTodos();
            $refreshPage = false;
        }
    });

    async function getTodos() {
        const res = await ajax.get(
            `${todosService}/api/v1/todos/${params.workspaceID}/month/${month}`
        );

        todos = res.todos;
    }
</script>

<svelte:head>
    <title>{workspace?.workspace} {lang.workspace} {lang.todos}</title>
</svelte:head>

<DefaultLayout>
    <div slot="title">
        {#if workspace}
            <LinksChain
                links={[
                    {
                        link: `#/workspace/${workspace?.workspaceID}`,
                        content: `${workspace?.icon} ${workspace?.workspace}`,
                    },
                    {
                        link: `#/workspace/${workspace?.workspaceID}/todos`,
                        content: `📌 ${lang.todos}`,
                    },
                ]}
            />
        {/if}
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = true)}>
            {lang.createTodo}
        </div>
    </div>

    <div class="page-container">
        {#if workspace}
            <h1><span class="icon">📌</span>{lang.todos}</h1>
            <div class="page-content">
                <Month
                    bind:value={month}
                    style="position: absolute; {!$rightToLeft
                        ? 'right: 0;'
                        : ''} z-index: 10;"
                />
                <TodosList {todos} />
            </div>
        {:else}
            <MessageBox
                icon="😵"
                title={lang.error404}
                message={lang.workspaceNotFound}
            />
        {/if}
    </div>
</DefaultLayout>

{#if popup}
    <AddTodoPopup
        workspaceID={params.workspaceID}
        on:close={() => (popup = false)}
    />
{/if}

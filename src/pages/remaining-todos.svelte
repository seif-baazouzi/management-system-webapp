<script lang="ts">
    import { onMount } from "svelte";
    import Single from "~/components/todos/Single.svelte";
    import { todosService } from "~/config";
    import type Todo from "~/interfaces/todo";
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import LinksChain from "~/components/LinksChain.svelte";
    import { refreshPage, rightToLeft } from "~/store";
    import ajax from "~/utils/ajax";
    import MessageBox from "~/components/MessageBox.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    let todos: Todo[] = [];

    onMount(getTodayTodos);

    refreshPage.subscribe(() => {
        if ($refreshPage) {
            getTodayTodos();
            $refreshPage = false;
        }
    });

    async function getTodayTodos() {
        const res = await ajax.get(`${todosService}/api/v1/todos/remaining`);
        todos = res.todos ?? [];
    }
</script>

<svelte:head>
    <title>${lang.remainingTodos}</title>
</svelte:head>

<DefaultLayout showMenu={false}>
    <div slot="title">
        <LinksChain
            links={[
                {
                    link: `#/`,
                    content: `โ ${lang.remainingTodos}`,
                },
            ]}
        />
    </div>

    <div class="page-container {$rightToLeft ? 'revert' : ''}">
        <h1><span class="icon">โ</span> {lang.remainingTodos}</h1>
        {#if todos.length}
            <div class="todos">
                {#each todos as todo}
                    <Single {todo} />
                {/each}
            </div>
        {:else}
            <MessageBox icon="๐งน" title={lang.noRemainingTodos} />
        {/if}
    </div>
</DefaultLayout>

<style>
    .todos {
        margin-top: 2rem;
    }
</style>

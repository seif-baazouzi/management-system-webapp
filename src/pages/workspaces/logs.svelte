<script lang="ts">
    import { onMount } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";
    import { refreshPage, rightToLeft, workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { logsService } from "~/config";
    import Month from "~/components/inputs/Month.svelte";
    import LogsList from "~/components/logs/List.svelte";
    import AddLogPopup from "~/popups/logs/Add.svelte";
    import LogsCharts from "~/components/logs/Charts.svelte";
    import type Log from "~/interfaces/log";
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
    let logs: Log[] = [];

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
            `${logsService}/api/v1/logs/${params.workspaceID}/month/${month}`
        );

        logs = res.logs ?? [];
    }
</script>

<svelte:head>
    <title>{workspace?.workspace} {lang.workspace} {lang.logs}</title>
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
                        link: `#/workspace/${workspace?.workspaceID}/logs`,
                        content: `📊 ${lang.logs}`,
                    },
                ]}
            />
        {/if}
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = true)}>
            {lang.createLog}
        </div>
    </div>

    <div class="page-container {$rightToLeft ? 'revert' : ''}">
        {#if workspace}
            <h1><span class="icon">📊</span>{lang.logs}</h1>
            <div class="page-content">
                <Month
                    bind:value={month}
                    style="position: absolute; {!$rightToLeft
                        ? 'right: 0;'
                        : ''} z-index: 10;"
                />
                <div class="content">
                    <LogsCharts {logs} />
                    <LogsList {logs} />
                </div>
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
    <AddLogPopup
        workspaceID={params.workspaceID}
        on:close={() => (popup = false)}
    />
{/if}

<style>
    .content {
        padding-top: 2rem;
    }
</style>

<script lang="ts">
    import { beforeUpdate } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import Error from "~/components/Error.svelte";
    import { workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import Children from "~/components/workspaces/Children.svelte";
    import LinksChain from "~/components/LinksChain.svelte";
    import UpdateWorkspacePopup from "~/popups/workspaces/Update.svelte";
    import DeleteWorkspacePopup from "~/popups/workspaces/Delete.svelte";
    import IconPicker from "~/components/IconPicker.svelte";
    import ajax from "~/utils/ajax";
    import { defaultIcon, workspacesService } from "~/config";

    export let params: { workspaceID: string };
    let workspace: Workspace = null;

    beforeUpdate(() => {
        workspacesList.subscribe((workspaces) => {
            workspace = workspaces.filter(
                (w) => w.workspaceID === params.workspaceID
            )[0];

            if (workspace) workspace.icon = workspace.icon || defaultIcon;
        });
    });

    let popup: string = null;

    async function updateWorkspaceIcon(newIcon: string) {
        await ajax.put(
            `${workspacesService}/api/v1/workspaces/${workspace.workspaceID}`,
            null,
            {
                workspace: workspace.workspace,
                icon: newIcon,
            }
        );

        $workspacesList = $workspacesList.map((w) => {
            if (w.workspaceID === workspace.workspaceID) w.icon = newIcon;
            return w;
        });
    }
</script>

<svelte:head>
    <title>{workspace?.workspace} Workspace</title>
</svelte:head>

<DefaultLayout>
    <div slot="title">
        <LinksChain
            links={[
                {
                    link: `#/workspace/${workspace?.workspaceID}`,
                    content: `${workspace?.icon} ${workspace?.workspace}`,
                },
            ]}
        />
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = "edit")}>edit</div>
        <div class="menu-item red" on:click={() => (popup = "delete")}>
            delete
        </div>
    </div>

    <div class="page-container">
        {#if workspace}
            <h1 class="has-icon">
                <IconPicker
                    fontSize="1.75rem"
                    bind:selectedIcon={workspace.icon}
                    onUpdate={updateWorkspaceIcon}
                />
                {workspace.workspace}
            </h1>
            <div class="page-content">
                <div class="links">
                    <a href="#/workspace/{workspace.workspaceID}/todos">Todos</a
                    >
                    <a href="#/workspace/{workspace.workspaceID}/notes">Notes</a
                    >
                    <a href="#/workspace/{workspace.workspaceID}/logs">Logs</a>
                </div>
                <Children workspaceID={workspace.workspaceID} />
            </div>
        {:else}
            <Error title="404 Error" message="Workspace not found." />
        {/if}
    </div>
</DefaultLayout>

{#if popup === "edit"}
    <UpdateWorkspacePopup
        workspaceID={params.workspaceID}
        workspace={workspace?.workspace}
        on:close={() => (popup = null)}
    />
{/if}

{#if popup === "delete"}
    <DeleteWorkspacePopup
        workspaceID={params.workspaceID}
        on:close={() => (popup = null)}
    />
{/if}

<style>
    @media (min-width: 768px) {
        .page-content {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .links {
            width: 100%;
        }
    }
</style>

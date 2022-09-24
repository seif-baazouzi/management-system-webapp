<script lang="ts">
    import { beforeUpdate } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";
    import { rightToLeft, workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import Children from "~/components/workspaces/Children.svelte";
    import LinksChain from "~/components/LinksChain.svelte";
    import UpdateWorkspacePopup from "~/popups/workspaces/Update.svelte";
    import DeleteWorkspacePopup from "~/popups/workspaces/Delete.svelte";
    import IconPicker from "~/components/IconPicker.svelte";
    import ajax from "~/utils/ajax";
    import { defaultIcon, workspacesService } from "~/config";

    import getLang from "~/langs/";
    const lang = getLang();

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
    <title>{workspace?.workspace} {lang.workspace}</title>
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
                ]}
            />
        {/if}
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = "edit")}>
            {lang.edit}
        </div>
        <div class="menu-item red" on:click={() => (popup = "delete")}>
            {lang.delete}
        </div>
    </div>

    <div class="page-container {$rightToLeft ? 'revert' : ''}">
        {#if workspace}
            <h1>
                <IconPicker
                    fontSize="1.75rem"
                    bind:selectedIcon={workspace.icon}
                    onUpdate={updateWorkspaceIcon}
                />
                {workspace.workspace}
            </h1>
            <div class="page-content">
                <div class="links">
                    <a href="#/workspace/{workspace.workspaceID}/todos"
                        >{lang.todos}
                    </a>
                    <a href="#/workspace/{workspace.workspaceID}/notes"
                        >{lang.notes}
                    </a>
                    <a href="#/workspace/{workspace.workspaceID}/logs"
                        >{lang.logs}</a
                    >
                </div>
                <Children workspaceID={workspace.workspaceID} />
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

        .revert .page-content {
            flex-direction: row-reverse;
        }

        .links {
            width: 100%;
        }
    }
</style>

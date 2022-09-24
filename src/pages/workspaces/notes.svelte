<script lang="ts">
    import { onMount } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";
    import { refreshPage, rightToLeft, workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { notesService, todosService } from "~/config";
    import AddNotePopup from "~/popups/notes/Add.svelte";
    import type Note from "~/interfaces/note";

    import getLang from "~/langs/";
    import List from "~/components/notes/List.svelte";
    const lang = getLang();

    export let params: { workspaceID: string };
    let workspace: Workspace = null;

    workspacesList.subscribe(() => {
        workspace = $workspacesList.filter(
            (w) => w.workspaceID === params.workspaceID
        )[0];
    });

    let notes: Note[] = [];
    let popup = false;

    onMount(getNotes);

    refreshPage.subscribe(() => {
        if ($refreshPage) {
            getNotes();
            $refreshPage = false;
        }
    });

    async function getNotes() {
        const res = await ajax.get(
            `${notesService}/api/v1/notes/${params.workspaceID}`
        );

        notes = res.notes ?? [];
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
                        link: `#/workspace/${workspace?.workspaceID}/notes`,
                        content: `📝 ${lang.notes}`,
                    },
                ]}
            />
        {/if}
    </div>

    <div slot="menu">
        <div class="menu-item" on:click={() => (popup = true)}>
            {lang.createNote}
        </div>
    </div>

    <div class="page-container {$rightToLeft ? 'revert' : ''}">
        {#if workspace}
            <h1><span class="icon">📝</span>{lang.notes}</h1>
            <div class="page-content">
                <List {notes} />
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
    <AddNotePopup
        workspaceID={params.workspaceID}
        on:close={() => (popup = false)}
    />
{/if}

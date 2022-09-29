<script lang="ts">
    import { onMount } from "svelte";

    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import { workspacesList } from "~/store";
    import type Workspace from "~/interfaces/workspace";
    import LinksChain from "~/components/LinksChain.svelte";
    import ajax from "~/utils/ajax";
    import { notesService, todosService } from "~/config";
    import type Note from "~/interfaces/note";
    import NotePage from "~/components/notes/Page.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    export let params: { workspaceID: string; noteID: string };
    let workspace: Workspace = null;

    workspacesList.subscribe(() => {
        workspace = $workspacesList.filter(
            (w) => w.workspaceID === params.workspaceID
        )[0];
    });

    let note: Note;

    onMount(async () => {
        const res = await ajax.get(
            `${notesService}/api/v1/notes/single/${params.noteID}`
        );

        note = res.note;
    });
</script>

<svelte:head>
    <title>{workspace?.workspace} {lang.workspace} {lang.todos}</title>
</svelte:head>

<DefaultLayout showMenu={false}>
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
                    {
                        link: `#/workspace/${workspace?.workspaceID}/notes/${note?.noteID}`,
                        content: `${note?.title}`,
                    },
                ]}
            />
        {/if}
    </div>

    <div class="page-container">
        {#if note}
            <div class="page-content">
                <NotePage {note} />
            </div>
        {/if}
    </div>
</DefaultLayout>

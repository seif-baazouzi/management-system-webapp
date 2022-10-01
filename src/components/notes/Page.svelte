<script lang="ts">
    import { notesService } from "~/config";
    import type Note from "~/interfaces/note";
    import ajax from "~/utils/ajax";
    import NoteTitle from "./Title.svelte";
    import NoteBody from "./Body.svelte";
    import AddBlock from "./AddBlock.svelte";

    export let note: Note;

    function updateNote(newBody: string = null) {
        if (!note.title) return;

        ajax.put(`${notesService}/api/v1/notes/${note.noteID}`, null, {
            title: note.title,
            body: newBody ?? note.body,
        });
    }
</script>

<NoteTitle bind:title={note.title} onChange={updateNote} />
<NoteBody bind:body={note.body} onChange={updateNote} />
<AddBlock bind:body={note.body} onChange={updateNote} />

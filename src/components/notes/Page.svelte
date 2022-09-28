<script lang="ts">
    import { not_equal } from "svelte/internal";
    import { notesService } from "~/config";
    import type Note from "~/interfaces/note";
    import ajax from "~/utils/ajax";
    import NoteTitle from "./Title.svelte";
    import NoteBody from "./Body.svelte";

    export let note: Note;

    function updateNote() {
        if (!note.title) return;

        ajax.put(`${notesService}/api/v1/notes/${note.noteID}`, null, {
            title: note.title,
            body: note.body,
        });
    }
</script>

<NoteTitle {note} onChange={updateNote} />
<NoteBody {note} />

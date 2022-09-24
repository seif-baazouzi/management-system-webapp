<script lang="ts">
    import { not_equal } from "svelte/internal";
    import { notesService } from "~/config";
    import type Note from "~/interfaces/note";
    import ajax from "~/utils/ajax";

    export let note: Note;

    function updateNote() {
        ajax.put(`${notesService}/api/v1/notes/${note.noteID}`, null, {
            title: note.title,
            body: note.body,
        });
    }
</script>

<h1>{note.title}</h1>
<textarea bind:value={note.body} on:change={updateNote} />

<script lang="ts">
    import type Note from "~/interfaces/note";
    import Delete from "~/popups/notes/Delete.svelte";
    import DeleteIcon from "../icons/Delete.svelte";

    export let note: Note;

    let deletePopup = false;
</script>

<div class="note">
    <a href="#/workspace/{note.workspaceID}/notes/{note.noteID}">
        {note.title}
    </a>
    <div class="actions">
        <DeleteIcon
            color="var(--red)"
            clickHandler={() => (deletePopup = true)}
        />
    </div>
</div>

{#if deletePopup}
    <Delete {note} on:close={() => (deletePopup = false)} />
{/if}

<style>
    .note {
        padding: 0.5rem;
        position: relative;
        border-radius: 0.25rem;
        padding-right: 2rem;
    }

    .note:hover {
        background-color: var(--light-gray);
    }

    a {
        font-weight: bold;
        font-size: 1.25rem;
        color: var(--black);
        text-transform: capitalize;
    }

    .actions {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
</style>

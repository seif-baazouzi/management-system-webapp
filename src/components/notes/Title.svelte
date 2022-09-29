<script lang="ts">
    import type Note from "~/interfaces/note";
    import Textarea from "~/components/Textarea.svelte";

    export let note: Note;
    export let onChange: Function;
</script>

<Textarea
    onChange={() => onChange()}
    placeholder="Title"
    bind:value={note.title}
    style="display: block; font-size: 3rem; font-weight: bold"
/>

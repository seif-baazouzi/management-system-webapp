<script lang="ts">
    import type Note from "~/interfaces/note";
    import Textarea from "~/components/Textarea.svelte";

    export let note: Note;
    export let onChange: Function;

    function onPressEnter(event: any) {
        if (event?.key === "Enter") {
            event?.preventDefault();
            event?.target.blur();
        }
    }
</script>

<Textarea
    {onChange}
    {onPressEnter}
    placeholder="Title"
    bind:value={note.title}
    style="display: block; font-size: 3rem; font-weight: bold"
/>

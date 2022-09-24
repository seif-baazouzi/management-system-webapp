<script type="ts">
    import MessageBox from "~/components/MessageBox.svelte";
    import type Note from "~/interfaces/note";
    import SingleNote from "./Single.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    export let notes: Note[];
    console.log(notes);
</script>

<div class="notes">
    {#if notes.length != 0}
        {#each notes as note}
            <SingleNote {note} />
        {/each}
    {:else}
        <MessageBox icon="🧹" title={lang.noNotes} />
    {/if}
</div>

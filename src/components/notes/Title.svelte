<script lang="ts">
    import type Note from "~/interfaces/note";
    import Textarea from "~/components/Textarea.svelte";

    export let title: string;
    export let onChange: Function;
</script>

<Textarea
    placeholder="Title"
    bind:value={title}
    onChange={() => onChange()}
    style="display: block; font-size: 3rem; height: 4rem; font-weight: bold; margin-bottom: 2rem"
/>

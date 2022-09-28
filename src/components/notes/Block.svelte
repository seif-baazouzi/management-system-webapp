<script lang="ts">
    import type Block from "~/interfaces/block";
    import Textarea from "../Textarea.svelte";

    export let block: Block;

    const styles = {
        h1: "display: block; font-size: 3rem;   font-weight: bold",
        h2: "display: block; font-size: 2.5rem; font-weight: bold",
        h3: "display: block; font-size: 2rem;   font-weight: bold",
        h4: "display: block; font-size: 1.5rem; font-weight: bold",
        h5: "display: block; font-size: 1rem;   font-weight: bold",
        h6: "display: block; font-size: 0.5rem; font-weight: bold",

        p: "display: block; font-size: 1rem;",
    };
</script>

<Textarea bind:value={block.content} style={styles[block.type] ?? styles.p} />

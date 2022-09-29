<script lang="ts">
    import Textarea from "~/components/Textarea.svelte";

    export let body: string;
    export let onChange: Function;
    let value = "";

    function onPressEnter(event: any) {
        if (event?.key === "Enter") {
            event?.preventDefault();
            event?.target.blur();

            value = value.trim();
            if (value) {
                body += "\n" + value;
                value = "";

                onChange(body);
            }
        }
    }
</script>

<Textarea
    bind:value
    placeholder="Add Block"
    {onPressEnter}
    style="display: block; font-size: 1rem; margin-top: 1rem"
/>

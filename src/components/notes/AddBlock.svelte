<script lang="ts">
    import Textarea from "~/components/Textarea.svelte";

    export let body: string;
    export let onChange: Function;
    let value = "";

    function onPressEnter(event: any) {
        value = value.trim();
        if (value) {
            body += "\n" + value;
            value = "";

            onChange(body);
            event?.target.focus();
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
</script>

<Textarea
    bind:value
    {onPressEnter}
    placeholder="Add Block"
    style="display: block; font-size: 1rem; margin: 1rem 0 5rem"
/>

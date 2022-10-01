<script lang="ts">
    import Textarea from "~/components/Textarea.svelte";
    import AddBlockOptions from "./AddBlockOptions.svelte";

    export let body: string;
    export let onChange: Function;

    let value = "";
    let showOptions = false;

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

    function onInput(event: any) {
        const value = event.target.value;
        showOptions = value === "/";
    }

    const setContent = (content: string) => (value = content);
</script>

<Textarea
    bind:value
    {onInput}
    {onPressEnter}
    placeholder="Press '/' to show options"
    style="display: block; font-size: 1rem; margin: 1rem 0 10rem"
/>
<AddBlockOptions bind:value />

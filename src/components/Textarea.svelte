<script lang="ts">
    import { onMount } from "svelte";

    export let style = "";
    export let value = "";
    export let classes = "";
    export let placeholder = "";
    export let autoFocus = false;
    export let onBlur: Function = null;
    export let onChange: Function = null;
    export let onPressEnter: Function = null;

    let ref: HTMLTextAreaElement;
    onMount(() => autoFocus && ref.focus());

    function setHeight(event: any) {
        event.target.style.height = 0;
        event.target.style.height = event.target.scrollHeight + "px";
    }

    function onPressEnterHandler(event: any) {
        if (event?.key === "Enter") {
            event?.preventDefault();
            event?.target.blur();

            onPressEnter && onPressEnter(event);
        }
    }
</script>

<textarea
    bind:this={ref}
    {style}
    bind:value
    {placeholder}
    class={classes}
    on:input={setHeight}
    on:focus={setHeight}
    on:keypress={onPressEnterHandler}
    on:blur={(e) => onBlur && onBlur(e)}
    on:change={(e) => onChange && onChange(e)}
/>

<style>
    textarea {
        width: 100%;
        resize: none;
        border: none;
        outline: none;
        line-height: 1;
    }

    textarea::-webkit-scrollbar {
        display: none;
    }
</style>

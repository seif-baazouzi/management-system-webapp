<script lang="ts">
    export let style = "";
    export let value = "";
    export let classes = "";
    export let placeholder = "";
    export let onChange: Function = null;
    export let onPressEnter: Function = null;

    function inputHandler(event: any) {
        event.target.style.height = 0;
        event.target.style.height = event.target.scrollHeight + "px";
    }
</script>

<textarea
    {style}
    bind:value
    {placeholder}
    class={classes}
    on:input={inputHandler}
    on:change={(e) => onChange && onChange(e)}
    on:keypress={(e) => onPressEnter && onPressEnter(e)}
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

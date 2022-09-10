<script lang="ts">
    export let title = "";
    export let submit: Function;

    function submitHandler(event: any) {
        event?.preventDefault();
        submit();
    }
</script>

<div class="container">
    <div class="form-container">
        <h2>{title}</h2>
        <form on:submit={submitHandler}>
            <slot />
        </form>

        <slot name="extra" />
    </div>
</div>

<style>
    .container {
        width: 100%;
        max-width: 520px;
        margin: 0 auto;
        padding: 0.25rem 1rem;
    }

    .form-container {
        width: 100%;
        height: calc(100vh - 4rem);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    form {
        width: 100%;
    }

    h2 {
        margin-bottom: 2rem;
    }
</style>

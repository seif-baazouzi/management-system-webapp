<script>
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";

    export let params;
</script>

<DefaultLayout>
    <div class="container">
        <h1>{params.workspaceID}</h1>
    </div>
</DefaultLayout>

<style>
    .container {
        padding: 1rem;
    }

    .container > h1 {
        font-size: 2rem;
        text-transform: capitalize;
    }
</style>

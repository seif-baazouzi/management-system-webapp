<script>
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import Error from "~/components/Error.svelte";
</script>

<svelte:head>
    <title>Page not found</title>
</svelte:head>

<DefaultLayout>
    <Error title="404 Error" message="Page not found." />
</DefaultLayout>

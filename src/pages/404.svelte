<script>
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";
</script>

<svelte:head>
    <title>Page not found</title>
</svelte:head>

<DefaultLayout>
    <MessageBox icon="😵" title="404 Error" message="Page not found." />
</DefaultLayout>

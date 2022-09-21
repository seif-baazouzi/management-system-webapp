<script>
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import MessageBox from "~/components/MessageBox.svelte";

    import getLang from "~/langs/";
    const lang = getLang();
</script>

<svelte:head>
    <title>{lang.pageNotFound}</title>
</svelte:head>

<DefaultLayout>
    <MessageBox icon="😵" title={lang.error404} message={lang.pageNotFound} />
</DefaultLayout>

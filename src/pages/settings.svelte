<script lang="ts">
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import LinksChain from "~/components/LinksChain.svelte";
    import { rightToLeft } from "~/store";

    import getLang from "~/langs/";
    const lang = getLang();
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<DefaultLayout showMenu={false}>
    <div slot="title">
        <LinksChain
            links={[
                {
                    link: `#/`,
                    content: `⚙️ ${lang.settings}`,
                },
            ]}
        />
    </div>

    <div class="page-container {$rightToLeft ? 'revert' : ''}">
        <h1><span class="icon">⚙️</span> {lang.settings}</h1>
    </div>
</DefaultLayout>

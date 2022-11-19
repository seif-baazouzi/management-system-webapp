<script lang="ts">
    import DefaultLayout from "~/layouts/DefaultLayout.svelte";
    import LinksChain from "~/components/LinksChain.svelte";
    import { rightToLeft } from "~/store";

    import getLang from "~/langs/";
    import UpdateUsername from "~/components/settings/UpdateUsername.svelte";
    import UpdatePassword from "~/components/settings/UpdatePassword.svelte";
    import Logout from "~/components/settings/Logout.svelte";
    import DarkModeSwitcher from "~/components/settings/DarkModeSwitcher.svelte";
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
        <div class="settings">
            <UpdateUsername />
            <UpdatePassword />
            <DarkModeSwitcher />
            <Logout />
        </div>
    </div>
</DefaultLayout>

<style>
    .settings {
        margin-top: 2rem;
        border: 0.1rem solid var(--gray);
        border-radius: 1rem;
    }

    .settings > :global(*) {
        padding: 1rem;
        cursor: pointer;
    }

    .settings > :global(*:not(:last-child)) {
        border-bottom: 0.1rem solid var(--gray);
    }
</style>

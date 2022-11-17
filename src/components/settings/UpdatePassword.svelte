<script>
    import UpdatePassword from "~/popups/settings/UpdatePassword.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    let showPopup = false;
</script>

<h5 on:click={() => (showPopup = true)}>{lang.updatePassword}</h5>

{#if showPopup}
    <UpdatePassword on:close={() => (showPopup = false)} />
{/if}

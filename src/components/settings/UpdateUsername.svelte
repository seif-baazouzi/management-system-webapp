<script>
    import UpdateUsername from "~/popups/settings/UpdateUsername.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    let showPopup = false;
</script>

<h5 on:click={() => (showPopup = true)}>{lang.updateUsername}</h5>

{#if showPopup}
    <UpdateUsername on:close={() => (showPopup = false)} />
{/if}

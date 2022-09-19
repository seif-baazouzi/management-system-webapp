<script lang="ts">
    import emojis from "~/utils/emojis";

    export let selectedIcon = "";
    export let fontSize = "1rem";

    let search = "";
    let showBox = false;
</script>

<div class="picker-container">
    <p style="font-size: {fontSize}" on:click={() => (showBox = !showBox)}>
        {selectedIcon}
    </p>
    <div
        class="box {showBox ? 'active' : ''}"
        style="top: calc({fontSize} + .5rem)"
    >
        <input type="text" placeholder="Search icons..." bind:value={search} />
        <div class="icons">
            {#each Object.entries(emojis) as [name, icon]}
                {#if search === "" || name
                        .toLowerCase()
                        .includes(search.toLowerCase())}
                    <div
                        class="icon"
                        on:click={() => {
                            selectedIcon = icon;
                            showBox = false;
                        }}
                    >
                        {icon}
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .picker-container {
        position: relative;
    }

    p {
        cursor: pointer;
    }

    .box {
        width: 280px;
        height: 280px;
        padding: 0.25rem;
        position: absolute;
        left: 0;
        border-radius: 0.25rem;
        box-shadow: var(--shadow);
        display: none;
        overflow-y: auto;
    }

    .box.active {
        display: block;
    }

    input {
        width: 100%;
        padding: 0.25em;
        margin-bottom: 0.75em;
        display: block;
        position: sticky;
        top: 0;
        font-size: 0.75rem;
        border-radius: 0.25em;
        background-color: var(--light-gray);
        z-index: 1;
    }

    .icons {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    .icon {
        padding: 0.25em;
        font-size: 1rem !important;
        text-align: center;
        border-radius: 0.25em;
        cursor: pointer;
    }

    .icon:hover {
        background-color: var(--light-gray);
    }
</style>

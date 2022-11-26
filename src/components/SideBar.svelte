<script lang="ts">
    import Workspaces from "~/components/workspaces/List.svelte";
    import AddWorkspaceBtn from "./workspaces/AddWorkspaceBtn.svelte";

    import getLang from "~/langs/";
    import { rightToLeft } from "~/store";
    const lang = getLang();
</script>

<div class="side-bar {$rightToLeft ? 'revert' : ''}">
    <div class="content">
        <div class="links">
            <a href="#/"><span>📅</span>{lang.todayTodos}</a>
            <a href="#/remaining-todos"><span>⌛</span>{lang.remainingTodos}</a>
            <a href="#/settings"><span>⚙️</span>{lang.settings}</a>
        </div>
        <Workspaces />
    </div>
    <AddWorkspaceBtn />
</div>

<style>
    .side-bar {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .side-bar.revert {
        text-align: right;
    }

    .content {
        padding: 0.5rem;
        flex: 1;
    }

    .links {
        margin-bottom: 1rem;
    }

    .side-bar.revert .links {
        align-items: flex-end;
    }

    .links a {
        font-size: 0.75rem;
        font-weight: bold;
        color: var(--black);
    }

    .links a span {
        font-size: 0.6rem;
        margin-right: 0.25em;
    }

    .side-bar.revert a {
        display: flex;
        flex-direction: row-reverse;
    }

    .side-bar.revert span {
        margin: 0;
        margin-left: 0.25em;
    }
</style>

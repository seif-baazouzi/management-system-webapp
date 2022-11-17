<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "~/components/inputs/Input.svelte";
    import { accountsService, logsService } from "~/config";
    import ajax from "~/utils/ajax";
    import Popup from "../Popup.svelte";

    import getLang from "~/langs/";
    const lang = getLang();

    const dispatch = createEventDispatcher();
    const close = () => dispatch("close");

    let newUsername = "";
    let password = "";
    let errors: any = {};

    async function updateUsername(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${accountsService}/api/v1/settings/update/username`,
            null,
            { newUsername, password }
        );

        if (res.message === "success") {
            close();
        } else {
            errors = res;
        }
    }
</script>

<Popup on:close={close}>
    <div class="popup-content">
        <h3>{lang.updateUsername}</h3>
        <form on:submit={updateUsername}>
            <Input
                type="text"
                label="New Username"
                bind:value={newUsername}
                error={errors.newUsername}
            />
            <Input
                type="password"
                label="Password"
                bind:value={password}
                error={errors.password}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

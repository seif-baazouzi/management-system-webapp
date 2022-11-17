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

    let oldPassword = "";
    let newPassword = "";
    let errors: any = {};

    async function updatePassword(event: any) {
        event?.preventDefault();

        const res = await ajax.put(
            `${accountsService}/api/v1/settings/update/password`,
            null,
            { oldPassword, newPassword }
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
        <h3>{lang.updatePassword}</h3>
        <form on:submit={updatePassword}>
            <Input
                type="password"
                label="Old Password"
                bind:value={oldPassword}
                error={errors.oldPassword}
            />
            <Input
                type="password"
                label="New Password"
                bind:value={newPassword}
                error={errors.newPassword}
            />
            <button class="blue block">{lang.submit}</button>
        </form>
    </div>
</Popup>

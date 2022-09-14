<script lang="ts">
    import { push } from "svelte-spa-router";

    import Input from "~/components/inputs/Input.svelte";
    import FormLayout from "~/layouts/FormLayout.svelte";

    import { accountsService } from "~/config/";
    import getLang from "~/langs/";

    const lang = getLang();

    let username = "";
    let password = "";
    let errors = {} as any;

    async function login() {
        const res = await fetch(`${accountsService}/api/v1/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (data.message) {
            localStorage.setItem("token", data.token);
            push("/");
        } else {
            errors = data;
        }
    }
</script>

<svelte:head>
    <title>Signup</title>
</svelte:head>

<FormLayout title={lang.joinUs} submit={login}>
    <Input
        type="text"
        label={lang.username}
        bind:value={username}
        error={errors.username}
    />
    <Input
        type="password"
        label={lang.password}
        bind:value={password}
        error={errors.password}
    />
    <button class="block blue">Login</button>

    <div class="link" slot="extra">
        {lang.haveAccount} <a href="/#/login">{lang.login}</a>
    </div>
</FormLayout>

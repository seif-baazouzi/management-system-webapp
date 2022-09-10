<script lang="ts">
    import { push } from "svelte-spa-router";

    import Input from "~/components/Input.svelte";
    import FormLayout from "~/layouts/FormLayout.svelte";

    import { accountsService } from "~/config/index.ts";

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

<FormLayout title="Join us" submit={login}>
    <Input
        type="text"
        label="Username"
        bind:value={username}
        error={errors.username}
    />
    <Input
        type="password"
        label="Password"
        bind:value={password}
        error={errors.password}
    />
    <button class="block blue">Login</button>

    <div class="link" slot="extra">
        Have an account? <a href="/#/signup">Login</a>
    </div>
</FormLayout>

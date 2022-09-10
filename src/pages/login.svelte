<script lang="ts">
    import Input from "~/components/Input.svelte";
    import FormLayout from "~/layouts/FormLayout.svelte";

    function login() {
        alert("Hello");
    }
</script>

<FormLayout title="Welcome Back" submit={login}>
    <Input type="text" label="E-mail" value="email" />
    <Input type="password" label="Password" value="password" />
    <button class="block blue">Login</button>

    <div class="link" slot="extra">
        Do not have an account? <a href="/#/signup">Create account</a>
    </div>
</FormLayout>

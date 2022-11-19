<script>
    import { push } from "svelte-spa-router";

    function logout() {
        localStorage.removeItem("token");
        push("/login");
    }
</script>

<h5 on:click={logout}>Logout</h5>

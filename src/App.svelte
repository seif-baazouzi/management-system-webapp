<script lang="ts">
	import Router from "svelte-spa-router";

	import Home from "./pages/home.svelte";
	import Login from "./pages/login.svelte";
	import Signup from "./pages/signup.svelte";

	const routes = {
		"/": Home,
		"/login": Login,
		"/signup": Signup,
	};
</script>

<Router {routes} />

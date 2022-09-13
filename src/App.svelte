<script lang="ts">
	import Router from "svelte-spa-router";

	import Home from "./pages/home.svelte";
	import Login from "./pages/login.svelte";
	import Signup from "./pages/signup.svelte";
	import Workspace from "./pages/workspace.svelte";
	import NotFound from "./pages/404.svelte";

	const routes = {
		"/": Home,
		"/login": Login,
		"/signup": Signup,
		"/workspace/:workspaceID": Workspace,

		"*": NotFound,
	};
</script>

<Router {routes} />

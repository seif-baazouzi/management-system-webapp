<script lang="ts">
	import Router from "svelte-spa-router";

	import Home from "./pages/home.svelte";
	import Login from "./pages/login.svelte";
	import Signup from "./pages/signup.svelte";
	import Workspace from "./pages/workspaces/index.svelte";
	import NotFound from "./pages/404.svelte";
	import Todos from "./pages/workspaces/todos.svelte";

	const routes = {
		"/": Home,
		"/login": Login,
		"/signup": Signup,
		"/workspace/:workspaceID": Workspace,
		"/workspace/:workspaceID/todos": Todos,

		"*": NotFound,
	};
</script>

<Router {routes} />

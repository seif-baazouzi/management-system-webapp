<script lang="ts">
	import Router from "svelte-spa-router";

	import { prevActive, nextActive } from "~/store";

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

	let lastUrl: string = null;
	const forwardStack: string[] = [];
	const backwardStack: string[] = [];

	function routingHandler(event: any) {
		const lastForwardUrl = forwardStack[forwardStack.length - 1];
		const lastBackwardUrl = backwardStack[backwardStack.length - 1];

		const oldURL = lastUrl;
		const newURL = event.detail.location;

		console.log(newURL);

		// go back
		if (newURL === lastBackwardUrl) {
			backwardStack.pop();
			forwardStack.push(oldURL);
		}

		// go forward
		else if (lastForwardUrl === newURL) {
			forwardStack.pop();
			backwardStack.push(oldURL);
		}

		// new url
		else if (oldURL != null) {
			backwardStack.push(oldURL);
		}

		lastUrl = newURL;

		$prevActive = backwardStack.length != 0;
		$nextActive = forwardStack.length != 0;
	}
</script>

<Router {routes} on:routeLoaded={routingHandler} />

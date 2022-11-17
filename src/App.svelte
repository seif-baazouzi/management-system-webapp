<script lang="ts">
	import Router from "svelte-spa-router";

	import { prevActive, nextActive } from "~/store";

	import Login from "./pages/login.svelte";
	import Signup from "./pages/signup.svelte";
	import TodayTodos from "./pages/today-todos.svelte";
	import Workspace from "./pages/workspaces/workspaces.svelte";
	import NotFound from "./pages/404.svelte";
	import Todos from "./pages/workspaces/todos.svelte";
	import Notes from "./pages/workspaces/notes/notes-list.svelte";
	import SingleNote from "./pages/workspaces/notes/single-note.svelte";
	import Logs from "./pages/workspaces/logs.svelte";
	import Settings from "./pages/settings.svelte";

	const routes = {
		"/": TodayTodos,
		"/login": Login,
		"/signup": Signup,
		"/settings": Settings,
		"/workspace/:workspaceID": Workspace,
		"/workspace/:workspaceID/todos": Todos,
		"/workspace/:workspaceID/notes": Notes,
		"/workspace/:workspaceID/notes/:noteID": SingleNote,
		"/workspace/:workspaceID/logs": Logs,

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

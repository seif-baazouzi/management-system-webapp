import { writable } from "svelte/store";
import type Workspace from "./interfaces/workspace";

export const lang = writable("en");
export const rightToLeft = writable(false);

export const workspacesList = writable([] as Workspace[]);

export const prevActive = writable(false);
export const nextActive = writable(false);

export const refreshPage = writable(false);

export const draggableWorkspace = writable(null as Workspace);
export const draggableBlock = writable(null as number);
export const draggedToBlock = writable(null as number);

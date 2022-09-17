import { writable } from "svelte/store";
import type Workspace from "./interfaces/workspace";

export const lang = writable("en");
export const rightToLeft = writable(false);

export const workspacesList = writable([] as Workspace[]);

export const prevActive = writable(false);
export const nextActive = writable(false);

export const refreshPage = writable(false);

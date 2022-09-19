interface Workspace {
    workspaceID: string;
    workspace: string;
    icon: string;
    parentWorkspace: string;
    children?: Workspace[];
}

export default Workspace;

interface Workspace {
    workspaceID: string;
    workspace: string;
    parentWorkspace: string;
    children?: Workspace[];
}

export default Workspace;

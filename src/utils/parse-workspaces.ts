function parseWorkspaces(workspacesList: any[], parentWorkspace = "00000000-0000-0000-0000-000000000000") {
    const workspaces = []

    for (const w of workspacesList) {
        if (w.parentWorkspace === parentWorkspace) {
            w.children = parseWorkspaces(workspacesList, w.workspaceID)
            workspaces.push(w)
        }
    }

    return workspaces
}

export default parseWorkspaces

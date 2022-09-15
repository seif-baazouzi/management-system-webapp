interface Todo {
    todoID: string;
    title: string;
    body: string;
    done: boolean;
    workspaceID: string;
    startingDate: string;
    endingDate?: string;
}

export default Todo;

import { taskConstants } from "../actions/constants";

const inistate = {
    error: null,
    tasks: [],
    posting: false,
    posted: false
}

const addNewTask = (tasks, task) => {
    return [
        ...tasks,
        task
    ]
}

export default (state = inistate, action) => {

    switch (action.type) {
        case taskConstants.TASK_READ_REQUEST:
            state = {
                ...state
            }
            break;
        case taskConstants.TASK_READ_SUCCESS:
            state = {
                ...state,
                tasks: action.payload.tasks
            }
            break;
        case taskConstants.TASK_CREATE_REQUEST:
            state = {
                ...state,
                posting: true
            }
            break;
        case taskConstants.TASK_CREATE_SUCCESS:
            const task = action.payload.task;
            const createdTasks = addNewTask(state.tasks, task);
            state = {
                ...state,
                tasks: createdTasks,
                posting: false,
                posted: true,
            }
            break;
        case taskConstants.TASK_CREATE_FAILURE:
            state = {
                ...inistate,
                error: action.payload.error
            }
            break;
        case taskConstants.TASK_READ_FAILURE:
            state = {
                ...inistate,
                error: action.payload.error
            }
            break;
        case taskConstants.LOGOUT_REQUEST:
            state = {
                ...inistate
            }
            break;
        case taskConstants.TASK_DELETE_REQUEST:
            state = {
                ...state
            }
            break;
        case taskConstants.TASK_DELETE_SUCCESS:
            state = {
                ...state
            }
            break;
        case taskConstants.TASK_DELETE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        case taskConstants.TASK_UPDATE_REQUEST:
            state = {
                ...state
            }
            break;
        case taskConstants.TASK_UPDATE_SUCCESS:
            state = {
                ...state
            }
            break;
        case taskConstants.TASK_UPDATE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
    }
    return state;
}
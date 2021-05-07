import { taskConstants } from "./constants";
import axiosInstance from "../helpers/axios";

export const createTask = (task) => {
    return async (dispatch) => {
        dispatch({
            type: taskConstants.TASK_CREATE_REQUEST
        });
        const res = await axiosInstance.post(`/tasks`, {
            ...task
        });
        if (res.status === 200) {
            const { task } = res.data;
            dispatch({
                type: taskConstants.TASK_CREATE_SUCCESS,
                payload: {
                    task
                }
            });
        }
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: taskConstants.TASK_CREATE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const readTasks = (task) => {
    return async (dispatch) => {
        dispatch({
            type: taskConstants.TASK_READ_REQUEST
        });
        const res = await axiosInstance.get(`/tasks`);
        if (res.status === 200) {
            const { tasks } = res.data;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            dispatch({
                type: taskConstants.TASK_READ_SUCCESS,
                payload: {
                    tasks
                }
            });
        }
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: taskConstants.TASK_READ_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}

export const deleteTaskAction = (id) => {
    return async (dispatch) => {
        dispatch({
            type: taskConstants.TASK_DELETE_REQUEST
        });
        const res = await axiosInstance.delete(`/tasks/${id}`, {
            payload: {
                id
            }
        });
        if (res.status === 200) {
            dispatch(readTasks());
            dispatch({
                type: taskConstants.TASK_DELETE_SUCCESS
            });
        }
        else {
            if (res.status === 404 || res.status === 400) {
                dispatch({
                    type: taskConstants.TASK_DELETE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                });
            }
        }
    }
}
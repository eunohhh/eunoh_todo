// todoSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ToDo } from "../d";

// 비동기 Thunk 액션 생성
export const fetchToDos = createAsyncThunk<ToDo[]>(
    "todos/fetchTodos",
    async () => {
        const response = await axios.get("http://localhost:3001/todos");
        return response.data;
    }
);

interface ToDoState {
    toDos: ToDo[];
    loading: boolean;
    error: string | null;
}

const initialState: ToDoState = {
    toDos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<ToDo>) => {
            state.toDos.push(action.payload);
        },
        deleteToDo: (state, action: PayloadAction<string>) => {
            state.toDos = state.toDos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        toggleIsDone: (state, action: PayloadAction<string>) => {
            const todo = state.toDos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.isDone = !todo.isDone;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDos.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchToDos.fulfilled,
                (state, action: PayloadAction<ToDo[]>) => {
                    state.loading = false;
                    state.toDos = action.payload;
                }
            )
            .addCase(fetchToDos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch todos";
            });
    },
});

export const { addToDo, deleteToDo, toggleIsDone } = todoSlice.actions;
export default todoSlice.reducer;
